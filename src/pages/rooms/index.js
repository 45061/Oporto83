import Image from "next/image";
import Link from "next/link";
import Slideshow from "../../components/Slideshow";
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
              <div>
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      <style jsx>
        {`
          h3 {
            color: ${colors.oporto};
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
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

export async function getServerSideProps(context) {
  const apiRooms = await fetch(`http://localhost:3000/api/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const dataRoom = await apiRooms.json();
  return { props: { dataRoom } };
}
