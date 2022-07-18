/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */

import styles from "../../styles/room.module.scss";

import Slideshow from "../../components/Slideshow";
import { colors } from "../../styles/theme";
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
  // const dispatch = useDispatch();
  // const sampleListData = useSelector((state) => state.sampleData);
  // const { sample } = sampleListData;
  const thisRoom = roomInfo.roomInfo;

  // const handleClcik = () => {
  //   dispatch(showFormAction());
  // };
  // useEffect(() => {
  //   dispatch(getSampleData());
  // }, [dispatch]);
  return (
    <>
      <h1>{`${thisRoom.roomNumer}`}</h1>
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
      <p> {thisRoom.description}</p>
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
      <style jsx>
        {`
          h1 {
            color: ${colors.secondary};
            display: flex;
            justify-content: center;
          }
          p {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
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
