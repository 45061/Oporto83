/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
import { Divider } from "@mantine/core";

import styles from "../../styles/room.module.scss";
import stylesHome from "../../styles/Home.module.scss";

import Slideshow from "../../components/Slideshow";
import CollapseButton from "../../components/CollapseButton";

export default function Room(roomInfo) {
  if (roomInfo.roomInfo === 0) {
    return (
      <>
        <h1>404</h1>
        <h1>Página no Encontrada</h1>
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

  const thisRoom = roomInfo.roomInfo;

  return (
    <>
      <div className={styles.title__room}>
        <h1>Disfruta de nuestra habitación</h1>
      </div>
      <div className={styles.room__title}>
        <h1>{`${thisRoom.roomNumer}`}</h1>
      </div>
      <div className={styles.room__container}>
        <container className={styles.container__slide}>
          <Slideshow controles autoplay velocidad="5000" intervalo="7000">
            {thisRoom.images.map((image) => (
              <slide className={styles.oporto__slide} key={image}>
                <img src={image} alt="room Oporto 83" />
              </slide>
            ))}
          </Slideshow>
        </container>
      </div>
      <div className={styles.room__oporto}>
        <p> {thisRoom.description}</p>
        <div className={styles.oporto__description}>
          <div className={styles.description__bath}>
            <table className={styles.bath__list}>
              <caption>En el baño encuentras:</caption>
              <ul>
                <tr>
                  <td>
                    <li>Toallas</li>
                  </td>
                  <td>
                    <li>Artículos de aseo gratis</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Bidet</li>
                  </td>
                  <td>
                    <li>Aseo adicional</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>WC</li>
                  </td>
                  <td>
                    <li>Toallas / sábanas (por un suplemento)</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Ducha de Agua Caliente</li>
                  </td>
                  <td>
                    <li>Papel higiénico</li>
                  </td>
                </tr>
              </ul>
            </table>
          </div>
          <div className={styles.description__room}>
            <table className={styles.room__list}>
              <caption>Equipamento Habitación:</caption>
              <ul>
                <tr>
                  <td>
                    <li>Escritorio</li>
                  </td>
                  <td>
                    <li>Ropa de cama</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>TV de pantalla plana</li>
                  </td>
                  <td>
                    <li>Muebles de exterior</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Zona de comedor exterior</li>
                  </td>
                  <td>
                    <li>Suelo de madera o parquet</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Perchero</li>
                  </td>
                  <td>
                    <li>Servicio de despertador</li>
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Equipo de planchado</li>
                  </td>
                  <td>
                    <li>Recepción 24h</li>
                  </td>
                </tr>
                {/* <tr>
              <td><li></li></td>
              <td><li></li></td>
            </tr>
            <tr>
              <td><li></li></td>
              <td><li></li></td>
            </tr> */}
              </ul>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.oporto__service}>
        <h2>Nuestros Servicios</h2>
        <div className={styles.service__buttons}>
          <div></div>
          <div className={styles.buttons__card}>
            <h4>Transporte</h4>
            <CollapseButton
              image="/autobus.png"
              text="Se presta el servicio de transporte por un costo adicional, el transporte puede ser a nivel urbano o intermunicipal de ser necesario."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Wifi</h4>
            <CollapseButton
              image="/wifi.png"
              text="Hay conexión a internet Wi-Fi disponible en todo el establecimiento. Gratis."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Parqueadero</h4>
            <CollapseButton
              image="/aparcamiento.png"
              text="Se presta el servicio de parqueadero con un costo adicional."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Desayunos</h4>
            <CollapseButton
              image="/desayuno.png"
              text="Disfruta de un desayuno americano exquisito con tu familia en nuestro establecimiento."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Habitaciones Familiares</h4>
            <CollapseButton
              image="/familia.png"
              text="Disfruta del calido alojamiento en nuestras habitaciones."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Libre de Humo</h4>
            <CollapseButton
              image="/no-fumar.png"
              text="Disfruta de todos nuestros espacios libres de humo."
            />
          </div>
          <div className={styles.buttons__card}>
            <h4>Mascotas</h4>
            <CollapseButton
              image="/cat-dog.png"
              text="Las mascotas seran resividas previa confirmacion y por un cobro adicional."
            />
          </div>
        </div>
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
    </>
  );
}

export async function getServerSideProps(context) {
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;

  const { room } = context.query;
  const apiRooms = await fetch(`${url}/api/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataRooms = await apiRooms.json();

  const { rooms } = dataRooms;
  const dataRoom = rooms.filter((roomId) => roomId._id === room);
  if (dataRoom.length === 0) {
    dataRoom[0] = 0;
  }
  const roomInfo = dataRoom[0];
  return { props: { roomInfo } };
}
