import Link from "next/link";
import { useSelector } from "react-redux";

import { colors } from "../../styles/theme";

import MenuNavbar from "../MenuNavbar";
import MenuCaja from "../MenuCaja";

export default function NavBar() {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <>
      <navbar>
        <contact>
          <p>Dir.: Calle 23 # 83 20</p>
          <p>Cel.: (+57) 319 798 1552</p>
        </contact>
        <nav>
          <logo>
            <Link href="/">
              <img src="/oporto.png" alt="oporto83" />
            </Link>
          </logo>
          <div>
            {user?.typeUser ? (
              <Link href="/calendar">
                <h3>Calendario</h3>
              </Link>
            ) : (
              ""
            )}
            {user?.typeUser ? <MenuCaja /> : ""}
            <Link href="/rooms">
              <h3>Habitaciones</h3>
            </Link>
            <Link href="/promotion">
              <h3>Ofertas</h3>
            </Link>
            <MenuNavbar />
          </div>
        </nav>
      </navbar>
      <style jsx>
        {`
          navbar {
            position: fixed;
            width: 100%;
            z-index: 30;
          }
          nav {
            display: flex;
            align-items: center;
            height: 90px;
            justify-content: space-around;
            background: white;
            padding: 0 2rem;
          }
          div {
            display: flex;
            gap: 15px;
          }
          h1 {
            margin: 0;
            line-height: 1.15;
            font-size: 3rem;
            color: #0070f3;
          }
          img {
            width: 110px;
            cursor: pointer;
          }
          contact {
            display: flex;
            padding: 1px;
            background-color: ${colors.secondary};
            justify-content: space-evenly;
          }
          p {
            margin: 0;
            color: white;
            font-size: 14px;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
          }
          h3 {
            color: ${colors.secondary};
            cursor: pointer;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
          }
          button {
            border: none;
            background: white;
            color: ${colors.secondary};
            display: block;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
