/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import Link from "next/link";
import { Divider, Table } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

import { colors } from "../../styles/theme";

import stylesHome from "../../styles/Home.module.scss";
import styles from "../../styles/rooms.module.scss";
import { showBoxCreatedAction } from "../../store/actions/modalAction";

import PublicModal from "../../components/PublicModal";
import NewBox from "../../components/NewBox";

export default function Box() {
  const { isAuth } = useSelector((state) => state.authReducer);
  const { showBoxCreated } = useSelector((state) => state.modalReducer);
  const { charge } = useSelector((state) => state.dateReducer);
  const { boxActive } = useSelector((state) => state.boxReducer);
  const [dataBox, setDataBox] = useState([]);

  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const fetchBox = async () => {
      await fetch("/api/box", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setDataBox(data.boxs);
        });
    };
    fetchBox();
  }, [charge]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(showBoxCreatedAction());
  }

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
  const rows = dataBox?.map((element) => (
    <tr key={element.nameBox}>
      {element.activeBox ? <td>Caja Activa</td> : <td>Caja Cerrada</td>}
      <td>{element.nameBox}</td>
      {element.lastClosingBalance ? (
        <td>
          ${new Intl.NumberFormat("es-MX").format(element.lastClosingBalance)}
        </td>
      ) : (
        <td></td>
      )}
      {element.timesOpen ? <td>{element.timesOpen}</td> : <td></td>}
      {element.lastOpening ? <td>{element.lastOpening}</td> : <td></td>}
      {element.lastClosing ? <td>{element.lastClosing}</td> : <td></td>}
      <td>{element.userId.firstName}</td>
    </tr>
  ));

  return (
    <>
      <span>
        <h1>Cajas</h1>
      </span>
      <div>
        <button onClick={handleClick}>Nueva Caja</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Activa o Inactiva</th>
            <th>Nombre Caja</th>
            <th>Ultimo Saldo de Cierre</th>
            <th>Veces Abierta</th>
            <th>Última Apertura</th>
            <th>Último Cierre</th>
            <th>Caja Abierta Por</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
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
      <style jsx>
        {`
          footer {
            margin-top: 20px;
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
          slide {
            min-width: 100%;
            overflow: hidden;
            transition: 0.3s ease all;
            z-index: 10;
            max-height: 600px;
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
            margin: 40px 2px;
            border: 1px solid ${colors.oporto};
            border-radius: 4px;
            color: white;
            background-color: ${colors.oporto};
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
      <PublicModal
        opened={showBoxCreated}
        onClose={() => dispatch(showBoxCreatedAction())}
        size={largeScreen ? "50%" : "90%"}
      >
        <NewBox />
      </PublicModal>
    </>
  );
}
