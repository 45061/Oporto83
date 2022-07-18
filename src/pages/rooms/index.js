import Image from "next/image";
import Link from "next/link";
import CollapseButton from "../../components/CollapseButton";
import Slideshow from "../../components/Slideshow";
import styles from "../../styles/Home.module.scss";
import { colors } from "../../styles/theme";

export default function Rooms({ dataRoom }) {
  const { rooms } = dataRoom;

  return (
    <>
      <h1>Estas son las Habitaciones</h1>
      {rooms.map((room) => (
        <container key={room}>
          <Link href={`/rooms/${room._id}`}>
            <a>
              <h2>{room.roomNumer}</h2>
            </a>
          </Link>
          <div>
            <contain>
              <Slideshow controles autoplay velocidad="5000" intervalo="7000">
                {room.images.map((image) => (
                  <slide key={image}>
                    <img src={image} alt="room Oporto 83" />
                  </slide>
                ))}
              </Slideshow>
            </contain>
            <description>
              <h3>Descripción: </h3>
              <p> {room.description}</p>
              <h3>Precio: ${room.price}</h3>

              <Link href={`/rooms/${room._id}`}>
                <button>Ver Habitación</button>
              </Link>
            </description>
          </div>
        </container>
      ))}

      <Link href="/rooms/room">
        <a>
          <p>Room</p>
        </a>
      </Link>

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
          }
          h1 {
            color: ${colors.secondary};
          }
          h2 {
            margin: 20px 0 0 30px;
            color: ${colors.secondary};
          }
          container {
            margin-top: 40px;
          }
          div {
            display: flex;
            gap: 40px;
            margin: 0 30px;
            border: 1px solid #fff;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
          contain {
            overflow: hidden;
            max-width: 500px;
            margin: 10px, auto;
            border-radius: 10px;
          }
          slide {
            min-width: 100%;
            overflow: hidden;
            transition: 0.3s ease all;
            z-index: 10;
            max-height: 340px;
            position: relative;
          }
          img {
            width: 100%;
            vertical-align: top;
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
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  // const cookies = new Cookies();
  // const token = cookies.get("token");
  const apiRooms = await fetch(`http://localhost:3000/api/rooms`, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const dataRoom = await apiRooms.json();
  return { props: { dataRoom } };
}
