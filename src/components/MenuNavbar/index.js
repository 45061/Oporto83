/* eslint-disable consistent-return */
import { Menu, Divider } from "@mantine/core";
import { UserCheck, UserOff, User } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import dayjs from "dayjs";

import { useMediaQuery } from "@mantine/hooks";
import {
  hiddeRegisterForm,
  showLoginForm,
  hiddeLoginForm,
  hiddeRecoverPassword,
} from "../../store/actions/modalAction";
import { logout } from "../../store/actions/authAction";
import { colors } from "../../styles/theme";
import PublicModal from "../PublicModal";
import GetEmail from "../GetEmail";
import Register from "../RegisterForm";
import Login from "../LoginForm";
import { closedBox } from "../../store/actions/boxAction";

export default function MenuNavbar() {
  const dispatch = useDispatch();
  const thisDay = dayjs().$d.toString().substr(0, 24);

  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { isAuth } = useSelector((state) => state.authReducer);
  const { showingRegisterForm, showingLoginForm, showRecoverPassword } =
    useSelector((state) => state.modalReducer);
  const { boxActive, balance } = useSelector((state) => state.boxReducer);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(showLoginForm());
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    if (!boxActive) {
      return dispatch(logout());
    }
    const dataBox = boxActive._id;
    const dataClosed = {
      lastClosing: thisDay,
      dataBox,
      balanceClosed: balance,
    };
    dispatch(closedBox(dataClosed));
    dispatch(logout());
  };
  return (
    <>
      <Menu control={<button type="button">Perfil</button>}>
        <Menu.Label>User</Menu.Label>
        {isAuth ? (
          <Menu.Item onClick={handleClick2} icon={<UserOff size={14} />}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item onClick={handleClick} icon={<UserCheck size={14} />}>
            Login
          </Menu.Item>
        )}
        <Divider />
        {isAuth ? (
          <Link href="/userProfile">
            <Menu.Item icon={<User size={14} />}>Perfil</Menu.Item>
          </Link>
        ) : (
          <Menu.Item onClick={handleClick} icon={<User size={14} />}>
            Perfil
          </Menu.Item>
        )}
      </Menu>
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
      <style jsx>
        {`
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
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </>
  );
}
