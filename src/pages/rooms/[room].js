/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */

import styles from "../../styles/room.module.scss";

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
    </>
  );
}

export async function getServerSideProps(context) {
  // const router = useRouter();
  const { room } = context.query;
  const apiRooms = await fetch(`http://localhost:3000/api/rooms`, {
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
