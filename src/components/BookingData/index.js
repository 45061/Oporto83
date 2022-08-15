/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-bind */
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { BrandBooking } from "tabler-icons-react";
import dayjs from "dayjs";

import {
  changeBookingDates,
  changeBookingRoom,
  deleteBooking,
  showChargeAction,
} from "../../store/actions/dateAction";
import { showBookingDataAction } from "../../store/actions/modalAction";
import { colors } from "../../styles/theme";
import ButtonColor from "../ButtonColor";
import styles from "../../styles/components/bookingdata.module.scss";
import Calendar from "../Calendar";

export default function BookingData({ data }) {
  const { clientName, dataBooking, room, lengthArray } = data;

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { dates } = useSelector((state) => state.dateReducer);

  const [dataRoom, setDataRooms] = useState([]);

  const firstDay = dayjs(dates[0]).dayOfYear();
  const secondDay = dayjs(dates[1]).dayOfYear();
  const reservedDays = secondDay - firstDay;

  function handleClick(event) {
    event.preventDefault();
    dispatch(deleteBooking(dataBooking));
    dispatch(showBookingDataAction());
    dispatch(showChargeAction());
  }

  function handleClick2(event) {
    event.preventDefault();
    const sendData = {
      idBooking: dataBooking._id,
      newroomId: value,
      roomId: room._id,
    };
    dispatch(changeBookingRoom(sendData));
  }

  function handleClick3(event) {
    event.preventDefault();

    const datesBooking = {
      idBooking: dataBooking._id,
      checkIn: `${new Date(dates[0]).getDate()}/${
        new Date(dates[0]).getMonth() + 1
      }/${new Date(dates[0]).getFullYear()}`,
      checkOut: `${new Date(dates[1]).getDate()}/${
        new Date(dates[1]).getMonth() + 1
      }/${new Date(dates[1]).getFullYear()}`,
      bookingDays: dates,
      reservedDays,
    };

    dispatch(changeBookingDates(datesBooking));
  }

  const { rooms } = dataRoom;

  useEffect(() => {
    const fetchDataRooms = async () => {
      await fetch("/api/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((datainfo) => {
          setDataRooms(datainfo);
        });
    };
    fetchDataRooms();
  }, []);

  return (
    rooms && (
      <>
        <span>
          <h2>Datos de la Reserva</h2>
        </span>
        <div className={styles.bookingdata}>
          <div className={styles.container}>
            <div className={styles.container__text}>
              <h3>Nombre Cliente: </h3>
              <p> {clientName}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Habitación Reservada: </h3>
              <p> {room.roomNumer}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Noches Reservadas: </h3>
              <p> {lengthArray}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Email: </h3>
              <p> {dataBooking.userBookingId.email}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Numero Contacto: </h3>
              <p> {dataBooking.userBookingId.numer}</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.container__text}>
              <h3>Check In: </h3>
              <p> {dataBooking.checkIn}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Check Out: </h3>
              <p> {dataBooking.checkOut}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Número de Personas: </h3>
              <p> {dataBooking.userBookingId.numerOfPeople}</p>
            </div>
            <div className={styles.container__text}>
              <h3>Valor Reserva: </h3>
              <p>
                {" "}
                $
                {new Intl.NumberFormat("es-MX").format(
                  dataBooking.userBookingId.price * lengthArray
                )}
              </p>
            </div>
          </div>
          <div className={styles.container__movebooking}>
            <h3>Mover Reserva </h3>
            <div className={styles.movebooking__button}>
              <Select
                required
                maxDropdownHeight={380}
                icon={<BrandBooking size={14} />}
                value={value}
                onChange={setValue}
                label="Selecciona la habitación a la que movera la reserva"
                placeholder={value.roomNumer}
                data={rooms.map((item) => ({
                  value: item._id,
                  label: `${item.roomNumer}`,
                }))}
              />
              <button onClick={handleClick2}>Mover Reserva</button>
            </div>
            <div className={styles.movebooking__calendar}>
              <Calendar />
              <div className={styles.calendar__button}>
                <button onClick={handleClick3}>Cambio Fecha</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ButtonColor
            text="Cambiar Estado"
            color="#4d70b5"
            marginButton="27"
            data={dataBooking}
          />
        </div>
        <div className={styles.button__cancel}>
          <button onClick={handleClick}>Cancelar Reserva</button>
        </div>

        <style jsx>
          {`
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

            p {
              margin: 0 0 0 5px;
            }
          `}
        </style>
      </>
    )
  );
}
