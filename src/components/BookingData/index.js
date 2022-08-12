/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";

import {
  deleteBooking,
  showChargeAction,
} from "../../store/actions/dateAction";
import { showBookingDataAction } from "../../store/actions/modalAction";
import { colors } from "../../styles/theme";
import ButtonColor from "../ButtonColor";

export default function BookingData({ data }) {
  const dispatch = useDispatch();
  const { clientName, dataBooking, room, lengthArray } = data;

  console.log("esto es dataBooking", dataBooking);

  function handleClick(event) {
    event.preventDefault();
    dispatch(deleteBooking(dataBooking));
    dispatch(showBookingDataAction());
    dispatch(showChargeAction());
  }

  return (
    dataBooking && (
      <>
        <span>
          <h2>Datos de la Reserva</h2>
        </span>

        <div>
          <container>
            <div>
              <h3>Nombre Cliente: </h3>
              <p> {clientName}</p>
            </div>
            <div>
              <h3>Habitación Reservada: </h3>
              <p> {room}</p>
            </div>
            <div>
              <h3>Noches Reservadas: </h3>
              <p> {lengthArray}</p>
            </div>
            <div>
              <h3>Email: </h3>
              <p> {dataBooking.userBookingId.email}</p>
            </div>
            <div>
              <h3>Numero Contacto: </h3>
              <p> {dataBooking.userBookingId.numer}</p>
            </div>
          </container>
          <container>
            <div>
              <h3>Check In: </h3>
              <p> {dataBooking.checkIn}</p>
            </div>
            <div>
              <h3>Check Out: </h3>
              <p> {dataBooking.checkOut}</p>
            </div>
            <div>
              <h3>Número de Personas: </h3>
              <p> {dataBooking.userBookingId.numerOfPeople}</p>
            </div>
            <div>
              <h3>Valor Reserva: </h3>
              <p>
                {" "}
                $
                {new Intl.NumberFormat("es-MX").format(
                  dataBooking.userBookingId.price * lengthArray
                )}
              </p>
            </div>
          </container>
        </div>
        <div>
          <ButtonColor
            text="Cambiar Estado"
            color="#4d70b5"
            marginButton="27"
            data={dataBooking}
          />
        </div>
        <div>
          <button onClick={handleClick}>Cancelar Reserva</button>
        </div>
        <style jsx>
          {`
            container {
              margin: 5px 30px;
            }
            div {
              margin-top: 5px;
              display: flex;
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
              margin: 20px 0 0 25%;
              border: 1px solid red;
              border-radius: 4px;
              color: white;
              background-color: red;
              cursor: pointer;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            }
            p {
              margin: 0 0 0 5px;
            }
          `}
        </style>
      </>
    )
  );
}
