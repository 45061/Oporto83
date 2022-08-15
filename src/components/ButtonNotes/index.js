import { useState } from "react";
import { BrandBooking, Note } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { putBookingAdmin } from "../../store/actions/dateAction";
import { showTextAreaAction } from "../../store/actions/modalAction";

export default function ButtonNotes(props) {
  const { marginButton, data } = props;
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();
    dispatch(showTextAreaAction());
  }

  return (
    <div>
      <button onClick={handleClick}>
        <Note size={14} strokeWidth={2} color="black" /> Notas
      </button>
      <style jsx>
        {`
          button {
            margin-top: ${marginButton}px;
            display: flex;
            justify-content: center;
            flex-grow: 0.5;
            padding: 6px 12px;
            border: 1px solid #4d70b5;
            border-radius: 4px;
            background-color: transparent;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            gap: 3px;
          }
          div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}
