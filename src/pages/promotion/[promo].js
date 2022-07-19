/* eslint-disable no-underscore-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */

import styles from "../../styles/promo.module.scss";

import Slideshow from "../../components/Slideshow";
import { colors } from "../../styles/theme";
import CollapseButton from "../../components/CollapseButton";

export default function Promo(promoInfo) {
  if (promoInfo.promoInfo === 0) {
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
  const thisPromo = promoInfo.promoInfo;

  // const handleClcik = () => {
  //   dispatch(showFormAction());
  // };
  // useEffect(() => {
  //   dispatch(getSampleData());
  // }, [dispatch]);
  return (
    <>
      <div className={styles.title__promo}>
        <h1>Disfruta de nuestra promoción</h1>
      </div>
      <div className={styles.promo__title}>
        <h1>{`${thisPromo.namePromo}`}</h1>
      </div>
      <div className={styles.room__container}>
        <container className={styles.container__slide}>
          <Slideshow controles autoplay velocidad="5000" intervalo="7000">
            {thisPromo.images.map((image) => (
              <slide className={styles.oporto__slide} key={image}>
                <img src={image} alt="room Oporto 83" />
              </slide>
            ))}
          </Slideshow>
        </container>
      </div>
      <div className={styles.room__oporto}>
        <p> {thisPromo.description}</p>
        <div className={styles.description__room}>
          <table className={styles.room__list}>
            <caption>Que incluye la promo:</caption>
            <ul>
              {thisPromo.gift.map((don) => (
                <tr key={don}>
                  <td>
                    <li>{don}</li>
                  </td>
                </tr>
              ))}
            </ul>
          </table>
        </div>
        <div className={styles.oporto__description}>
          <h2>Precio: ${thisPromo.price}</h2>
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
  const { promo } = context.query;
  const apiPromo = await fetch(`http://localhost:3000/api/promo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataPromos = await apiPromo.json();
  const { promos } = dataPromos;
  const dataPromo = promos.filter((promoId) => promoId._id === promo);
  if (dataPromo.length === 0) {
    dataPromo[0] = 0;
  }
  const promoInfo = dataPromo[0];
  return { props: { promoInfo } };
}
