/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-bind */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { putBookingAdmin } from "../../store/actions/dateAction";
import {
  showBookingDataAction,
  showTextAreaAction,
} from "../../store/actions/modalAction";
import { colors } from "../../styles/theme";

export default function TexArea({ data }) {
  const { dataBooking } = data;
  const [textArea, setTextArea] = useState("");
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();
    const putData = {
      textArea,
      idBooking: dataBooking._id,
    };
    dispatch(putBookingAdmin(putData));
    dispatch(showTextAreaAction());
  }
  return (
    dataBooking && (
      <>
        <span>
          <h2>Notas</h2>
        </span>

        <div>
          <textarea
            onChange={(event) => setTextArea(event.currentTarget.value)}
            defaultValue={dataBooking.textAreaData}
            placeholder="Escribe las Notas de la Habitación"
          ></textarea>
        </div>
        <div>
          <button onClick={handleClick}>Guardar Notas</button>
        </div>

        <style jsx>
          {`
            div {
              margin-top: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            span {
              display: flex;
              justify-content: center;
              background-color: #1c5480;

              border-radius: 10px;
              padding-bottom: 5px;
            }
            h2 {
              color: #fff;
              margin: 0;
              text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
            }
            h3 {
              display: flex;
              justify-content: center;
              margin: 0;
              color: ${colors.secondary};
              text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
              cursor: pointer;
            }
            img {
              width: 100%;
              vertical-align: top;
            }
            button {
              justify-content: center;
              flex-grow: 0.5;
              padding: 6px 12px;
              margin: 20px 0 0 0;
              border: 1px solid #4d70b5;
              border-radius: 4px;
              color: white;
              background-color: #4d70b5;
              cursor: pointer;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            }
            p {
              margin: 0 0 0 5px;
            }
            textarea {
              margin-top: 20px;
              width: 100%;
              height: 300px;
              border-color: #4d70b5;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
          `}
        </style>
      </>
    )
  );
}
