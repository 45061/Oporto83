import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import {
  hiddeRegisterForm,
  showLoginForm,
  hiddeLoginForm,
  hiddeRecoverPassword,
} from "../../store/actions/modalAction";
import Register from "../../components/RegisterForm";
import Login from "../LoginForm";
import { colors } from "../../styles/theme";
import PublicModal from "../PublicModal";
import GetEmail from "../GetEmail";

export default function NavBar() {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showingRegisterForm, showingLoginForm, showRecoverPassword } =
    useSelector((state) => state.modalReducer);
  const handleClick = () => {
    dispatch(showLoginForm());
  };
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

            <button onClick={handleClick}>Login</button>
          </div>
        </nav>
        <PublicModal
          opened={showingRegisterForm}
          onClose={() => dispatch(hiddeRegisterForm())}
          size={largeScreen ? "50%" : "90%"}
        >
          <Register />
        </PublicModal>
        <PublicModal
          opened={showingLoginForm}
          onClose={() => dispatch(hiddeLoginForm())}
          size={largeScreen ? "30%" : "90%"}
        >
          <Login />
        </PublicModal>
        <PublicModal
          opened={showRecoverPassword}
          onClose={() => dispatch(hiddeRecoverPassword())}
        >
          <GetEmail />
        </PublicModal>
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
