/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Loader, Progress } from "@mantine/core";
import dayjs from "dayjs";

import InputValidator from "../ImputValidator";

import styles from "../../styles/components/ImageUploadForm.module.scss";
import { postBox } from "../../store/actions/boxAction";

function NewBox() {
  const thisDay = dayjs().$d.toString().substr(0, 24);
  const [newBox, setnewBox] = useState({
    activeBox: false,
    timesOpen: 0,
    nameBox: "",
    lastOpening: thisDay,
    initialBalance: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setnewBox({
      ...newBox,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(postBox(newBox));
  };

  return (
    <form className={styles.image_upload_form}>
      <header className={styles.image_upload_form__header}></header>
      <div className="videoform__content">
        <InputValidator
          name="nameBox"
          id="nameBox"
          value={newBox.nameBox}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Nombre de la Caja"
          onChange={onChange}
          errorMessage="El titulo es obligatorio "
          required
        />
        <p>Saldo Inicial</p>
        <InputValidator
          name="initialBalance"
          id="initialBalance"
          value={newBox.initialBalance}
          type="number"
          classname={styles.image_upload_form__input}
          placeholder="Balance Inicial"
          onChange={onChange}
        />
      </div>
      <div className={styles.button}>
        <button onClick={handleSubmit}>Crear Caja</button>
      </div>
    </form>
  );
}

export default NewBox;
