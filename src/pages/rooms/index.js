/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/iframe-has-title */

import Link from "next/link";
import { Divider } from "@mantine/core";
import Slideshow from "../../components/Slideshow";

import stylesHome from "../../styles/Home.module.scss";
import styles from "../../styles/rooms.module.scss";
import { colors } from "../../styles/theme";

export default function Rooms({ dataRoom }) {
  const { rooms } = dataRoom;

  return (
    <>
      <span>
        <h1>Nuestras Habitaciones</h1>
      </span>
      {rooms.map((room) => {
        const priceCop = new Intl.NumberFormat("es-MX").format(room.price);
        return (
          <div className={styles.container} key={room}>
            <Link href={`/rooms/${room._id}`}>
              <h2>{room.roomNumer}</h2>
            </Link>
            <div className={styles.container__slider}>
              <div className={styles.slider__contain}>
                <Slideshow controles autoplay velocidad="5000" intervalo="7000">
                  {room.images.map((image) => (
                    <div className={styles.contain__slide} key={image}>
                      <img src={image} alt="room Oporto 83" />
                    </div>
                  ))}
                </Slideshow>
              </div>
              <div className={styles.slider__text}>
                <h3>Descripción: </h3>
                <p> {room.description}</p>
                <h3>Precio por noche: $ {priceCop} COP</h3>
                <Link href={`/rooms/${room._id}`}>
                  <button>Ver Habitación</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

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
      <style jsx>
        {`
          footer {
            margin-top: 20px;
          }
          span {
            display: flex;
            justify-content: center;
            background-color: #1c5480;
            border-radius: 10px 10px 0 0;
            padding-bottom: 5px;
          }
          h1 {
            color: #fff;
            margin: 0;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
          }
          h2 {
            display: flex;
            justify-content: center;
            margin: 30px 0 5px 0;
            color: ${colors.secondary};
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }

          button {
            justify-content: center;
            flex-grow: 0.5;
            padding: 6px 12px;
            margin: 40px 2px 2px 2px;
            border: 1px solid ${colors.oporto};
            border-radius: 4px;
            color: white;
            background-color: ${colors.oporto};
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  const apiRooms = await fetch(`${url}/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const dataRoom = await apiRooms.json();
  return { props: { dataRoom } };
}
