/* eslint-disable no-return-await */
/* eslint-disable react/button-has-type */
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useMediaQuery } from "@mantine/hooks";
import { Tabs, Table, Divider } from "@mantine/core";
import { BrandBooking } from "tabler-icons-react";
import ImageUploadForm from "../../components/ImageUploadForm";
import PublicModal from "../../components/PublicModal";

import styles from "../../styles/userProfile.module.scss";
import stylesHome from "../../styles/Home.module.scss";
import {
  showFormAction,
  showPromoAction,
} from "../../store/actions/modalAction";
import PromoUpload from "../../components/PromoUpload";

import Slideshow from "../../components/Slideshow";
import { deleteRoom, deletePromo } from "../../store/actions/roomAction";
import {
  deleteBooking,
  showChargeAction,
} from "../../store/actions/dateAction";

export default function userProfile(props) {
  const { dataBookings } = props;

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.authReducer);
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showForm, showPromo } = useSelector((state) => state.modalReducer);
  const { charge } = useSelector((state) => state.dateReducer);

  const [roomsBooking, setRoomsBooking] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [dataRoom, setDataRooms] = useState([]);
  const [dataPromo, setDataPromo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error2, setError] = useState();

  const { promos } = dataPromo;
  const { rooms } = dataRoom;

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(showFormAction());
  };
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(showPromoAction());
  };
  const rows = dataBookings
    .map((element) => {
      const dinerCop = new Intl.NumberFormat("es-MX").format(
        element.reservedDays * element.roomId.price
      );

      return (
        <tr key={element}>
          <td>{element.roomId.roomNumer}</td>
          <td>{element.checkIn}</td>
          <td>{element.checkOut}</td>
          <td>
            {element.userId.firstName} {element.userId.lastName}
          </td>

          <td>{element.userId.numer}</td>
          <td>{element.userId.email}</td>
          <td>{element.reservedDays}</td>
          <td>$ {dinerCop}</td>
          <td>{element.mass}</td>
        </tr>
      );
    })
    .reverse();

  useEffect(() => {
    setLoading(true);
    const { bookings } = user;
    if (bookings) {
      try {
        const fetchData = async () => {
          await Promise.all(
            await bookings.map(async (booking) => {
              const serieBooking = { bookingId: booking };
              const response = await fetch(`${url}/booking/bookinguser`, {
                method: "POST",
                body: JSON.stringify(serieBooking),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const data = await response.json();
              return data;
            })
          ).then((data) => {
            setRoomsBooking(data);
          });
        };
        fetchData();

        const fetchDataRooms = async () => {
          await fetch(`${url}/rooms`, {
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

        const fetchDataPromos = async () => {
          await fetch(`${url}/promo`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              setDataPromo(data);
            });
        };
        fetchDataPromos();
      } catch (error) {
        setError(error);
      }
    }
    setLoading(false);
  }, [loading, user, error2, charge]);

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

  if (loading) {
    return (
      <>
        <div>
          <img src="/loading.svg" alt="gif Loading" />
          <h2>Loading...</h2>
        </div>
        <style jsx>
          {`
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-top: 10%;
            }
          `}
        </style>
      </>
    );
  }

  return (
    roomsBooking && (
      <>
        <div className={styles.container}>
          <div className={styles.header__container}>
            <div className={styles.container__wellcome}>
              <h2>Bienvenido a la consola de control</h2>
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
              {user?.typeUser ? (
                <div className={styles.user__buttons}>
                  <button onClick={handleClick2}>Subir Promo</button>
                  <button onClick={handleClick}>Subir Room</button>
                </div>
              ) : (
                // eslint-disable-next-line react/self-closing-comp
                <div></div>
              )}
            </div>
          </div>
          {user?.typeUser ? (
            <Tabs variant="outline">
              <Tabs.Tab label="Publicaciones" icon={<BrandBooking size={14} />}>
                <div className={styles.container__data}>
                  <div className={styles.data}>
                    <div>
                      <span>
                        <h2>Listado de Habitaciones</h2>
                      </span>
                    </div>
                    <div>
                      {rooms?.map((room) => {
                        const priceCop = new Intl.NumberFormat("es-MX").format(
                          room.price
                        );
                        return (
                          <div className={styles.promo__container} key={room}>
                            <div>
                              <Link href={`/rooms/${room._id}`}>
                                <h3>{room.roomNumer}</h3>
                              </Link>
                            </div>
                            <div className={styles.container__contents}>
                              <div className={styles.contents__contain}>
                                <div className={styles.contain__slideshow}>
                                  <Slideshow
                                    autoplay
                                    velocidad="5000"
                                    intervalo="7000"
                                  >
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
                                  <h4>Precio: $ {priceCop}</h4>
                                </div>
                              </div>
                              <div className={styles.contents__buttons}>
                                <Link href={`/rooms/${room._id}`}>
                                  <button>Ver Habitación</button>
                                </Link>
                                <div className={styles.buttons__delete}>
                                  <button
                                    onClick={() => {
                                      dispatch(deleteRoom(room));
                                      dispatch(showChargeAction());
                                    }}
                                  >
                                    Borrar Habitación
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.data}>
                    <div>
                      <span>
                        <h2>Listado de Promociones</h2>
                      </span>
                    </div>
                    <div>
                      {promos?.map((prom) => {
                        const priceCop = new Intl.NumberFormat("es-MX").format(
                          prom.price
                        );
                        return (
                          <div className={styles.promo__container} key={prom}>
                            <div>
                              <Link href={`/promotion/${prom._id}`}>
                                <h3>{prom.namePromo}</h3>
                              </Link>
                            </div>
                            <div className={styles.container__contents}>
                              <div className={styles.contents__contain}>
                                <div className={styles.contain__slideshow}>
                                  <Slideshow
                                    autoplay
                                    velocidad="5000"
                                    intervalo="7000"
                                  >
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
                                  <h4>Precio: $ {priceCop}</h4>
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
                                      dispatch(showChargeAction());
                                    }}
                                  >
                                    Borrar Promoción
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Tabs.Tab>
              <Tabs.Tab label="Reservas" icon={<BrandBooking size={14} />}>
                <Table striped highlightOnHover>
                  <thead>
                    <tr>
                      <th>Habitación</th>
                      <th>CheckIn</th>
                      <th>CheckOut</th>
                      <th>Huesped</th>
                      <th>Número Contacto</th>
                      <th>Correo</th>
                      <th>Noches Reservadas</th>
                      <th>Valor Reserva</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </Tabs.Tab>
            </Tabs>
          ) : (
            <div className={styles.data}>
              <div>
                <span>
                  <h2>Listado de Reservas</h2>
                </span>
              </div>
              <div>
                {roomsBooking.map((roomData) => {
                  const precioCop = new Intl.NumberFormat("es-MX").format(
                    roomData.booking.reservedDays * roomData.room.price
                  );
                  return (
                    <div className={styles.promo__container} key={roomData}>
                      <div>
                        <Link href={`/rooms/${roomData.room._id}`}>
                          <h3>
                            Reserva de habitación: {roomData.room.roomNumer}
                          </h3>
                        </Link>
                      </div>
                      <div className={styles.container__contents}>
                        <div className={styles.contents__contain__user}>
                          <div className={styles.contain__slideshow}>
                            <Slideshow
                              autoplay
                              velocidad="5000"
                              intervalo="7000"
                            >
                              {roomData.room.images.map((image) => (
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
                            <h4>Descripción de la habitación: </h4>
                            <p> {roomData.room.description}</p>
                            <h4>Precio de la reserva: $ {precioCop} COP</h4>
                          </div>
                          <div>
                            <h4>Datos de reserva:</h4>
                            <p>
                              Check In: {roomData.booking.checkIn.substr(0, 10)}
                            </p>
                            <p>
                              Check Out:{" "}
                              {roomData.booking.checkOut.substr(0, 10)}
                            </p>
                            <p>
                              Dias reservados: {roomData.booking.reservedDays}
                            </p>
                          </div>
                        </div>
                        <div className={styles.contents__buttons}>
                          <Link href={`/rooms/${roomData.room._id}`}>
                            <button>Ver Habitación</button>
                          </Link>
                          <div className={styles.buttons__delete}>
                            <button
                              onClick={() => {
                                dispatch(deleteBooking(roomData.booking));
                              }}
                            >
                              Cancelar Reserva
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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

export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  const apiBookings = await fetch(`${url}/booking`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataBooking = await apiBookings.json();

  const dataBookings = dataBooking.bookings;

  return { props: { dataBookings } };
}
