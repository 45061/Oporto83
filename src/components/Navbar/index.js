import Link from "next/link";

import { colors } from "../../styles/theme";

import MenuNavbar from "../MenuNavbar";

export default function NavBar() {
  return (
    <>
      <navbar>
        <contact>
          <p>Dir.: Calle 23 # 83 20</p>
          <p>Cel.: 319 798 1552</p>
        </contact>
        <nav>
          <logo>
            <Link href="/">
              <img src="/oporto.png" alt="oporto83" />
            </Link>
          </logo>
          <div>
            <Link href="/rooms">
              <h3>Descripción</h3>
            </Link>
            <Link href="/rooms">
              <h3>Ofertas</h3>
            </Link>
            <Link href="/rooms">
              <h3>Cosas por hacer</h3>
            </Link>
            <Link href="/rooms">
              <h3>Contactanos</h3>
            </Link>
            <Link href="/rooms">
              <h3>Empresarial</h3>
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
          }
          h3 {
            color: ${colors.secondary};
            cursor: pointer;
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

        `}
      </style>
    </>
  );
}
