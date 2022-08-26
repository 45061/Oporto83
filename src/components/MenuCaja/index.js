import { Menu, Divider } from "@mantine/core";
import { CashBanknote, CashOff, Cash } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { useMediaQuery } from "@mantine/hooks";
import {
  hiddeLoginForm,
  hiddeRecoverPassword,
  showBoxSelectAction,
} from "../../store/actions/modalAction";
import { colors } from "../../styles/theme";
import PublicModal from "../PublicModal";
import GetEmail from "../GetEmail";
import Login from "../LoginForm";
import SelectBox from "../SelectBox";
import { closedBox } from "../../store/actions/boxAction";

export default function MenuCaja() {
  const router = useRouter();
  const dispatch = useDispatch();

  const thisDay = dayjs().$d.toString().substr(0, 24);

  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showBoxSelect, showingLoginForm, showRecoverPassword } = useSelector(
    (state) => state.modalReducer
  );
  const { boxActive, isActivedBox, balance } = useSelector(
    (state) => state.boxReducer
  );

  const handleClick = (event) => {
    event.preventDefault();
    const dataBox = boxActive._id;
    const dataClosed = {
      lastClosing: thisDay,
      dataBox,
      balanceClosed: balance,
    };
    dispatch(closedBox(dataClosed));
    router.push("/box");
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(showBoxSelectAction());
  };
  return (
    <>
      <Menu control={<button type="button">Caja</button>}>
        <Menu.Label>Caja</Menu.Label>
        {isActivedBox ? (
          <Link href={`/box/${boxActive._id}`}>
            <Menu.Item icon={<Cash size={14} />}>Ir a Caja</Menu.Item>
          </Link>
        ) : (
          <Menu.Item onClick={handleClick2} icon={<Cash size={14} />}>
            Abrir Caja
          </Menu.Item>
        )}

        <Menu.Item onClick={handleClick} icon={<CashOff size={14} />}>
          Cerrar Caja
        </Menu.Item>

        <Divider />
        <Link href="/box">
          <Menu.Item icon={<CashBanknote size={14} />}>Crear Caja</Menu.Item>
        </Link>
      </Menu>
      <PublicModal
        opened={showBoxSelect}
        onClose={() => dispatch(showBoxSelectAction())}
        size={largeScreen ? "50%" : "90%"}
      >
        <SelectBox />
      </PublicModal>
      <PublicModal
        opened={showingLoginForm}
        onClose={() => dispatch(hiddeLoginForm())}
        size={largeScreen ? "20%" : "60%"}
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
