import Link from "next/link";
import { colors } from "../../styles/theme";
import Hamburger from "../Hamburger";

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
              <a>
                <img src="/oporto.png" alt="oporto83" />
              </a>
            </Link>
          </logo>
          <div>
            <Link href="/rooms">
              <a>
                <h3>Descripción</h3>
              </a>
            </Link>
            <Link href="/rooms">
              <a>
                <h3>Ofertas</h3>
              </a>
            </Link>
            <Link href="/rooms">
              <a>
                <h3>Cosas por hacer</h3>
              </a>
            </Link>
            <Link href="/rooms">
              <a>
                <h3>Contactanos</h3>
              </a>
            </Link>
            <Link href="/rooms">
              <a>
                <h3>Empresarial</h3>
              </a>
            </Link>
            <Hamburger />
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
          }
        `}
      </style>
    </>
  );
}
