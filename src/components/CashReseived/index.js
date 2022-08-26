/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Cash, Bed, CashBanknote } from "tabler-icons-react";
import { Select } from "@mantine/core";
import dayjs from "dayjs";

import InputValidator from "../ImputValidator";

import styles from "../../styles/components/ImageUploadForm.module.scss";
import { paymentBox } from "../../store/actions/boxAction";

function CashReseived({ dataRoom, boxId }) {
  const [payment, setPayment] = useState("");
  const [room, setRoom] = useState("");
  const [paymentBy, setPaymentBy] = useState("react");
  const [cash, setcash] = useState({
    concept: "",
    cash: "",
    typePayment: "",
    roomId: "",
    reasonOfPay: "",
    boxId: "",
  });

  const thisDay = dayjs().$d.toString().substr(0, 24);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setcash({
      ...cash,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    cash.typePayment = payment;
    cash.roomId = room;
    cash.reasonOfPay = paymentBy;
    cash.boxId = boxId;
    cash.timeTransaction = thisDay;
    dispatch(paymentBox(cash));
  };

  return (
    <div>
      <div className="videoform__content">
        <Select
          required
          maxDropdownHeight={380}
          icon={<Cash size={14} />}
          value={payment}
          onChange={setPayment}
          label="Selecciona el metodo de pago"
          placeholder="Metodo de pago"
          data={[
            {
              value: "Efectivo",
              label: "Efectivo",
            },
            {
              value: "Datafono",
              label: "Datafono",
            },
            {
              value: "TransferenciaNequi",
              label: "Transferencia Nequi",
            },
            {
              value: "TransferenciaBanco",
              label: "Transferencia Banco",
            },
            {
              value: "AirBnb",
              label: "AirBnb",
            },
          ]}
        />
        <Select
          required
          maxDropdownHeight={380}
          icon={<Bed size={14} />}
          value={room}
          onChange={setRoom}
          label="Habitacion del pago"
          placeholder="Habitación"
          data={dataRoom.map((item) => ({
            value: item._id,
            label: `${item.roomNumer}`,
          }))}
        />
        <Select
          required
          maxDropdownHeight={380}
          icon={<CashBanknote size={14} />}
          value={paymentBy}
          onChange={setPaymentBy}
          label="Motivo del Pago"
          placeholder="Pago por"
          data={[
            {
              value: "Consumibles",
              label: "Pago Consumibles",
            },
            {
              value: "Habitacion",
              label: "Pago Habitacion",
            },
            {
              value: "Inyeccion",
              label: "Inyeccion Efectivo Caja",
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
          placeholder="Dinero a Agregar"
          onChange={onChange}
        />
      </div>
      <div className={styles.button}>
        <button onClick={handleSubmit}>Añadir Dinero</button>
      </div>
    </div>
  );
}

export default CashReseived;
