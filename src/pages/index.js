/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
import { Select, Divider } from "@mantine/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import dayjs from "dayjs";
import { BrandBooking } from "tabler-icons-react";
import { useRouter } from "next/router";

import { showLoginForm, hiddeLoginForm } from "../store/actions/modalAction";

import styles from "../styles/Home.module.scss";
import Slide from "../components/Slide";
import CollapseButton from "../components/CollapseButton";
import CardTourism from "../components/CardTourism";
import Calendar from "../components/Calendar";
import PublicModal from "../components/PublicModal";
import Login from "../components/LoginForm";
import { postBooking, showChargeAction } from "../store/actions/dateAction";
import { getPostsRooms } from "./api/getPosts";

const dayOfYear = require("dayjs/plugin/dayOfYear");

dayjs.extend(dayOfYear);

export default function Home({ dataRoom }) {
  const rooms = JSON.parse(dataRoom);
  const router = useRouter();
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { dates } = useSelector((state) => state.dateReducer);
  const { isAuth } = useSelector((state) => state.authReducer);
  const { showingLoginForm } = useSelector((state) => state.modalReducer);
  const [value, setValue] = useState("");
  const firstDay = dayjs(dates[0]).dayOfYear();
  const secondDay = dayjs(dates[1]).dayOfYear();
  const reservedDays = secondDay - firstDay;

  const handelclick = (event) => {
    event.preventDefault();
    const data = {
      roomId: value._id,
      checkIn: `${new Date(dates[0]).getDate()}/${
        new Date(dates[0]).getMonth() + 1
      }/${new Date(dates[0]).getFullYear()}`,
      checkOut: `${new Date(dates[1]).getDate()}/${
        new Date(dates[1]).getMonth() + 1
      }/${new Date(dates[1]).getFullYear()}`,
      bookingDays: dates,
      reservedDays,
      reservedStatus: true,
    };

    dispatch(postBooking(data));
    router.push("/userProfile");
  };

  const handelclick2 = (event) => {
    event.preventDefault();
    dispatch(showLoginForm());
  };

  return (
    <div>
      <div className={styles.booking}>
        <Select
          required
          maxDropdownHeight={380}
          icon={<BrandBooking size={14} />}
          value={value}
          onChange={setValue}
          label="Selecciona la habitación a reservar"
          placeholder={value.roomNumer}
          data={rooms.map((item) => ({
            value: item,
            label: `${item.roomNumer}`,
          }))}
        />
        <Calendar room={value} />
        <div className={styles.booking__button}>
          {isAuth ? (
            <button onClick={handelclick}>Realiza tu Reserva</button>
          ) : (
            <button onClick={handelclick2}>
              Para realizar tu Reserva has Login
            </button>
          )}
        </div>
      </div>
      <Divider my="sm" />
      <div className={styles.oporto}>
        <div className={styles.oporto__slide}>
          <div className={styles.slide__oporto}>
            <img src="/oporto.png" alt="oporto83" />
          </div>
          <Slide />
          <div className={styles.slide__oporto}>
            <img src="/oporto.png" alt="oporto83" />
          </div>
        </div>
        <div div className={styles.oporto__wellcome}>
          <div>
            <h2>Bienvenido a Oporto 83 Bogotá</h2>
            <p>
              El Hotel Aparta-Hotel Oporto 83 está situado a sólo 15 minutos del
              aeropuerto internacional El Dorado. Nuestros huéspedes encontrarán
              un nuevo estilo de hospitalidad con una cálida bienvenida,
              instalaciones modernas, acceso ilimitado a Internet en todo el
              hotel, habitaciones confortables con ventanas y luz natural.
              Nuestros huéspedes pueden estar encantados con nuestros deliciosos
              desayunos. Cerca del hotel se encuentra el Centro Comercial
              Hayuelos, la Embajada de los Estados Unidos, Corferias y el Centro
              Deportivo de Alto Rendimiento. Además, el área financiera de la
              calle 26 donde se encuentran empresas globales como Unilever,
              Marsh, Daimler, GSK y Coca Cola. Por otro lado, si nuestros
              huéspedes están buscando un poco de diversión, cerca encontraran
              el centro comercial Salitre Plaza, Jardín Botánico, Centro
              Interactivo Maloka y Pricesmart. En coche y a 5 minutos se
              encuentran el centro comercial Gran Estación, el Parque
              Metropolitano Simón Bolívar y el parque de atracciones Salitre
              Mágico.
            </p>
          </div>
          <div className={styles.wellcome__facade}>
            <img src="/image13.jpg" alt="dinning room" />
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
        <div className={styles.oporto__tourism}>
          <div className={styles.tourism__title}>
            <h2>Descubre lugares inolvidables</h2>
          </div>
          <div className={styles.tourism__card}>
            <CardTourism
              title="Centro Histórico La Candelaria"
              body="La Candelaria es el centro vibrante de Bogotá, con lugares icónicos como una catedral de la época colonial y el Capitolio neoclásico que flanquea la Plaza Bolívar. Estrechas calles llenas de tiendas que venden esmeraldas y artesanías conducen a lugares de interés cultural."
              image="/centro.jpg"
            />
            <CardTourism
              title="Monserrate"
              body="El cerro de Monserrate es el más conocido de los cerros Orientales de Bogotá. Junto a Guadalupe es uno de los cerros tutelares de la ciudad. Monserrate tiene una altitud de 3152 m y se ubica sobre la cordillera oriental."
              image="/monserrate.jpg"
            />
            <CardTourism
              title="Museo del Oro"
              body="El Museo del Oro del Banco de la República de Colombia es una institución pública la cual su fin es la adquisición, conservación y exposición de piezas de orfebrería y alfarería de culturas indígenas del periodo precolombino de la actual Colombia."
              image="/museo.jpg"
            />
            <CardTourism
              title="Parque Mirador de los Nevados"
              body="El Parque Mirador de los Nevados es un parque metropolitano ubicado en la localidad de Suba, al Norte de Bogotá en Colombia. Presenta una extensión de 6 hectáreas y cuenta con senderos, mirador sobre el occidente de la ciudad y relictos de flora y fauna nativa."
              image="/parque.jpg"
            />
          </div>
        </div>
        <div className={styles.oporto__rewards}>
          <div>
            <img src="/oporto2.png" alt="oporto logo" />
          </div>
          <div className={styles.rewards__text}>
            <h2>Programa de fidelización</h2>
            <p>
              Haz parte de un club que te brindará beneficios en tus viajes con
              Oporto 83 Rewards. Un mundo de beneficios.
            </p>
            <p>
              Es facil, rapido y lo empiezas a disfrutar desde ya. ¡Inscríbete!{" "}
            </p>
            <p>Conctactanos y pregunta como.</p>
          </div>
        </div>
      </div>

      <footer>
        <Divider size="sm" />
        <div className={styles.oporto__data}>
          <div className={styles.data__location}>
            <div className={styles.location__info}>
              <div className={styles.info__name}>
                <h3>Oporto 83 Bogotá</h3>
              </div>
              <div className={styles.info__hotel}>
                <div className={styles.hotel__location}>
                  <p>Calle 23 </p>
                  <p>Numero 83 20</p>
                  <p>Bogotá</p>
                  <p>CP 110931</p>
                  <p>Colombia</p>
                </div>
                <div className={styles.hotel__check}>
                  <p>Registro de entrada 2 pm</p>
                  <p>Registro de salida 11 am </p>
                </div>
                <div className={styles.hotel__data}>
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
        opened={showingLoginForm}
        onClose={() => dispatch(hiddeLoginForm())}
        size={largeScreen ? "30%" : "90%"}
      >
        <Login />
      </PublicModal>
    </div>
  );
}

export async function getServerSideProps() {
  const rooms = await getPostsRooms();

  const dataRoom = JSON.stringify(rooms);
  return { props: { dataRoom } };
}
