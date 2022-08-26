/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CashBanknote } from "tabler-icons-react";
import { Select } from "@mantine/core";
import dayjs from "dayjs";

import InputValidator from "../ImputValidator";

import styles from "../../styles/components/ImageUploadForm.module.scss";
import { withdrawBox } from "../../store/actions/boxAction";

function CashWithdrawed({ dataRoom, boxId }) {
  const [paymentBy, setPaymentBy] = useState("react");
  const thisDay = dayjs().$d.toString().substr(0, 24);
  const [cash, setcash] = useState({
    concept: "",
    cash: "",
    typeWithdraw: "Efectivo",
    reasonOfWithdraw: "",
    boxId: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setcash({
      ...cash,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    cash.reasonOfWithdraw = paymentBy;
    cash.boxId = boxId;
    cash.timeTransaction = thisDay;
    dispatch(withdrawBox(cash));
  };

  return (
    <div>
      <div className="videoform__content">
        <Select
          required
          maxDropdownHeight={380}
          icon={<CashBanknote size={14} />}
          value={paymentBy}
          onChange={setPaymentBy}
          label="Motivo del Retiro"
          placeholder="Retiro por"
          data={[
            {
              value: "Cafeteria",
              label: "Cafeteria",
            },
            {
              value: "Turnos",
              label: "Turnos",
            },
            {
              value: "Retiro",
              label: "Retiro Caja",
            },
            {
              value: "Otros",
              label: "Otros",
            },
          ]}
        />
        <InputValidator
          name="concept"
          id="concept"
          value={cash.concept}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Concepto"
          onChange={onChange}
          errorMessage="El titulo es obligatorio "
          required
        />
        <InputValidator
          name="cash"
          id="cash"
          value={cash.cash}
          type="number"
          classname={styles.image_upload_form__input}
          placeholder="Dinero a Retirar"
          onChange={onChange}
        />
      </div>
      <div className={styles.button}>
        <button onClick={handleSubmit}>Retirar Dinero</button>
      </div>
    </div>
  );
}

export default CashWithdrawed;
