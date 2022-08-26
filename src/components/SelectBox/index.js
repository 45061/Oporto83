import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { Select } from "@mantine/core";
import { CashBanknote } from "tabler-icons-react";
import InputValidator from "../ImputValidator";

import styles from "../../styles/components/ImageUploadForm.module.scss";
import { openBox } from "../../store/actions/boxAction";

export default function SelectBox() {
  const thisDay = dayjs().$d.toString().substr(0, 24);

  const [dataBox, setDataBox] = useState([]);
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState({
    activeBox: true,
    lastOpening: thisDay,
    initialBalance: 0,
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setBalance({
      ...balance,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchBox = async () => {
      await fetch("/api/box", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setDataBox(data.boxs);
        });
    };
    fetchBox();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      dataBox: value,
      balance,
    };
    dispatch(openBox(data));
  };

  return (
    <div>
      <div className={styles.selectBox}>
        <Select
          required
          maxDropdownHeight={380}
          icon={<CashBanknote size={14} />}
          value={value}
          onChange={setValue}
          label="Selecciona la Caja a Abrir"
          placeholder="Seleccione Caja"
          data={dataBox.map((item) => ({
            value: item._id,
            label: `${item.nameBox}`,
          }))}
        />
        <InputValidator
          name="initialBalance"
          id="initialBalance"
          value={balance.initialBalance}
          type="number"
          classname={styles.image_upload_form__input}
          placeholder="Balance Inicial"
          onChange={onChange}
        />
      </div>
      <div className={styles.button__box}>
        <button onClick={handleSubmit}>Abrir Caja</button>
      </div>
    </div>
  );
}
