/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@mantine/hooks";
import { Divider } from "@mantine/core";
import PublicModal from "../../components/PublicModal";

import styles from "../../styles/userProfile.module.scss";
import stylesHome from "../../styles/Home.module.scss";
import {
  showBookingAdminAction,
  showBookingDataAction,
  showTextAreaAction,
} from "../../store/actions/modalAction";
import BookingAdmin from "../../components/BookingAdmin";

import { getPostsBookings, getPostsRooms } from "../api/getPosts";
import BookingsTable from "../../components/BookingsTable";
import BookingData from "../../components/BookingData";
import TexArea from "../../components/TextArea";

export default function userProfile({ dataRoomsHotel }) {
  const rooms = JSON.parse(dataRoomsHotel);

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.authReducer);
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showBookingAdmin, showBookingData, showTextArea } = useSelector(
    (state) => state.modalReducer
  );
  const { charge, dataBooking } = useSelector((state) => state.dateReducer);

  const [dataRoom, setDataRooms] = useState([]);
  const [dataBookings, setDataBookings] = useState([]);
  const [error2, setError] = useState();

  const handleClic3 = (event) => {
    event.preventDefault();
    dispatch(showBookingAdminAction());
  };

  if (!isAuth) {
    return (
      <>
        <h1>Inicia Sesión</h1>
        <style jsx>
          {`
            h1 {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </>
    );
  }

  useEffect(() => {
    if (isAuth) {
      try {
        const fetchBooking = async () => {
          await fetch("/api/booking", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              setDataBookings(data.bookings);
            });
        };
        fetchBooking();
        const fetchDataRooms = async () => {
          await fetch("/api/rooms", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              setDataRooms(data);
            });
        };
        fetchDataRooms();
      } catch (error) {
        setError(error);
      }
    }
  }, [user, error2, charge]);

  return (
    dataRoom && (
      <>
        <div className={styles.container}>
          <div className={styles.header__container}>
            <div className={styles.container__wellcome}>
              <h2>Bienvenido al Calendario</h2>
            </div>
            <div className={styles.container__user}>
              <div className={styles.user__data}>
                <h2>{`Hola ${user?.name} ${user?.lastName}`}</h2>
                <h4>
                  {user?.typeUser
                    ? "Tipo de usuario: Administrador"
                    : "Tipo de usuario: Huesped"}
                </h4>
              </div>
              <div className={styles.user__buttons}>
                <button onClick={handleClic3}>Crear Reserva</button>
              </div>
            </div>
          </div>

          <BookingsTable data={dataBookings.bookings} roomsData={dataRoom} />
        </div>
        <footer>
          <Divider size="sm" />
          <div className={stylesHome.oporto__data}>
            <div className={stylesHome.data__location}>
              <div className={stylesHome.location__info}>
                <div className={stylesHome.info__name}>
                  <h3>Oporto 83 Bogotá</h3>
                </div>
                <div className={stylesHome.info__hotel}>
                  <div className={stylesHome.hotel__location}>
                    <p>Calle 23 </p>
                    <p>Numero 83 20</p>
                    <p>Bogotá</p>
                    <p>CP 110931</p>
                    <p>Colombia</p>
                  </div>
                  <div className={stylesHome.hotel__check}>
                    <p>Registro de entrada 2 pm</p>
                    <p>Registro de salida 11 am </p>
                  </div>
                  <div className={stylesHome.hotel__data}>
                    <p>oporto83bogota@gmail.com</p>
                    <p>319 798 1552</p>
                    <p>601 320 7227</p>
                  </div>
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.589398577784!2d-74.12861808482616!3d4.667059796609922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9d7ca84dbe1d%3A0x75faa422bb2bbd7a!2sHotel%20Oporto%2083!5e0!3m2!1ses!2sco!4v1656737163809!5m2!1ses!2sco"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </footer>
        <PublicModal
          opened={showBookingAdmin}
          onClose={() => dispatch(showBookingAdminAction())}
          size={largeScreen ? "50%" : "90%"}
        >
          <BookingAdmin dataRoom={dataRoom} />
        </PublicModal>
        <PublicModal
          opened={showBookingData}
          onClose={() => dispatch(showBookingDataAction())}
          size={largeScreen ? "60%" : "100%"}
        >
          <BookingData data={dataBooking} />
        </PublicModal>

        <PublicModal
          opened={showTextArea}
          onClose={() => dispatch(showTextAreaAction())}
          size={largeScreen ? "50%" : "90%"}
        >
          <TexArea data={dataBooking} />
        </PublicModal>
      </>
    )
  );
}

export async function getServerSideProps() {
  const apiBookings = await getPostsBookings();
  const dataBookingHotel = JSON.stringify(apiBookings);

  const apiRooms = await getPostsRooms();
  const dataRoomsHotel = JSON.stringify(apiRooms);

  return { props: { dataBookingHotel, dataRoomsHotel } };
}
