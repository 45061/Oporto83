import { Select, Switch } from "@mantine/core";
import { useState } from "react";
import { BrandBooking } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { putBookingAdmin } from "../../store/actions/dateAction";
import ButtonNotes from "../ButtonNotes";

export default function ButtonColor(props) {
  const { text, color, marginButton, data } = props;
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(data.paymentMade);
  const dispatch = useDispatch();

  function handleClick2(event) {
    event.preventDefault();
    const putData = {
      value,
      idBooking: data._id,
      checked,
    };
    dispatch(putBookingAdmin(putData));
  }

  return (
    <div>
      <Select
        required
        maxDropdownHeight={380}
        icon={<BrandBooking size={14} />}
        value={value}
        onChange={setValue}
        label="Selecciona el Estado"
        placeholder="Estado de Reserva"
        data={[
          {
            value: "1",
            label: "Reserva Activa",
          },
          {
            value: "2",
            label: "Habitación Ocupada",
          },
          {
            value: "3",
            label: "Check Out",
          },
          {
            value: "4",
            label: "No Show",
          },
        ]}
      />
      <Switch
        label="Pago Hecho"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <button onClick={handleClick2}>{text}</button>
      <ButtonNotes marginButton={marginButton} data={data} />
      <style jsx>
        {`
          button {
            justify-content: center;
            flex-grow: 0.5;
            padding: 6px 12px;
            border: 1px solid ${color};
            border-radius: 4px;
            color: white;
            background-color: ${color};
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            margin-top: ${marginButton}px;
          }
          div {
            margin-top: 15px;
            display: flex;
            justify-content: space-evenly;
            align-items: flex-end;
            width: 100%;
            gap: 30px;
          }
        `}
      </style>
    </div>
  );
}
