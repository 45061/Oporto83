/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import ImageUploadForm from "../../components/ImageUploadForm";
import PublicModal from "../../components/PublicModal";

import styles from "../../styles/userProfile.module.scss";
import {
  showFormAction,
  showPromoAction,
} from "../../store/actions/modalAction";
import PromoUpload from "../../components/PromoUpload";

import Slideshow from "../../components/Slideshow";
import { deleteRoom, deletePromo } from "../../store/actions/roomAction";

export default function userProfile(props) {
  const router = useRouter();

  const { dataRoom, dataPromo } = props;
  const { promos } = dataPromo;
  const { rooms } = dataRoom;
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.authReducer);
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showForm, showPromo } = useSelector((state) => state.modalReducer);
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(showFormAction());
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(showPromoAction());
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
  // console.log(isAuth);
  return (
    user && (
      <>
        <div className={styles.container}>
          <div className={styles.header__container}>
            <div className={styles.container__wellcome}>
              <h2>Bienvenido a la consola de control</h2>
            </div>
            <div className={styles.container__user}>
              <div className={styles.user__data}>
                <h2>{`Hola ${user.firstName} ${user.lastName}`}</h2>
                <h4>{`Tipo de usuario: ${user.typeUser}`}</h4>
              </div>
              <div className={styles.user__buttons}>
                <button onClick={handleClick2}>Subir Promo</button>
                <button onClick={handleClick}>Subir Room</button>
              </div>
            </div>
          </div>
          <div className={styles.container__data}>
            <div className={styles.data}>
              <div>
                <span>
                  <h2>Listado de Habitaciones</h2>
                </span>
              </div>
              <div>
                {rooms.map((room) => (
                  <div className={styles.promo__container} key={room}>
                    <div>
                      <Link href={`/rooms/${room._id}`}>
                        <h3>{room.roomNumer}</h3>
                      </Link>
                    </div>
                    <div className={styles.container__contents}>
                      <div className={styles.contents__contain}>
                        <div className={styles.contain__slideshow}>
                          <Slideshow autoplay velocidad="5000" intervalo="7000">
                            {room.images.map((image) => (
                              <div
                                className={styles.slideshow__slide}
                                key={image}
                              >
                                <img src={image} alt="room Oporto 83" />
                              </div>
                            ))}
                          </Slideshow>
                        </div>
                        <div>
                          <h4>Descripción: </h4>
                          <p> {room.description}</p>
                          <h4>Precio: ${room.price}</h4>
                        </div>
                      </div>
                      <div className={styles.contents__buttons}>
                        <Link href={`/promotion/${room._id}`}>
                          <button>Ver Habitación</button>
                        </Link>
                        <div className={styles.buttons__delete}>
                          <button
                            onClick={() => {
                              dispatch(deleteRoom(room));
                              router.push("/userProfile");
                            }}
                          >
                            Borrar Habitación
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.data}>
              <div>
                <span>
                  <h2>Listado de Promociones</h2>
                </span>
              </div>
              <div>
                {promos.map((prom) => (
                  <div className={styles.promo__container} key={prom}>
                    <div>
                      <Link href={`/promotion/${prom._id}`}>
                        <h3>{prom.namePromo}</h3>
                      </Link>
                    </div>
                    <div className={styles.container__contents}>
                      <div className={styles.contents__contain}>
                        <div className={styles.contain__slideshow}>
                          <Slideshow autoplay velocidad="5000" intervalo="7000">
                            {prom.images.map((image) => (
                              <div
                                className={styles.slideshow__slide}
                                key={image}
                              >
                                <img src={image} alt="room Oporto 83" />
                              </div>
                            ))}
                          </Slideshow>
                        </div>
                        <div>
                          <h4>Descripción: </h4>
                          <p> {prom.description}</p>
                          <h4>Precio: ${prom.price}</h4>
                        </div>
                      </div>
                      <div className={styles.contents__buttons}>
                        <Link href={`/promotion/${prom._id}`}>
                          <button>Ver Promoción</button>
                        </Link>
                        <div className={styles.buttons__delete}>
                          <button
                            onClick={() => {
                              dispatch(deletePromo(prom));
                              router.push("/userProfile");
                            }}
                          >
                            Borrar Promoción
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PublicModal
          opened={showForm}
          onClose={() => dispatch(showFormAction())}
          size={largeScreen ? "50%" : "90%"}
        >
          <ImageUploadForm />
        </PublicModal>
        <PublicModal
          opened={showPromo}
          onClose={() => dispatch(showPromoAction())}
          size={largeScreen ? "50%" : "90%"}
        >
          <PromoUpload />
        </PublicModal>
      </>
    )
  );
}

export async function getServerSideProps(context) {
  const apiRooms = await fetch(`http://localhost:3000/api/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const dataRoom = await apiRooms.json();
  const apiPromos = await fetch(`http://localhost:3000/api/promo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataPromo = await apiPromos.json();
  return { props: { dataRoom, dataPromo } };
}
