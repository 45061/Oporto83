import { Divider, Tabs, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CashBanknote, CashBanknoteOff } from "tabler-icons-react";

import styles from "../../styles/components/BoxTable.module.scss";
import stylesHome from "../../styles/Home.module.scss";
import { getPostsPromo, getPostsRoomsData } from "../api/getPosts";
import BoxTable from "../../components/BoxTable";
import PublicModal from "../../components/PublicModal";
import {
  showAddCashAction,
  showWithdrawCashAction,
} from "../../store/actions/modalAction";
import CashReseived from "../../components/CashReseived";
import CashWithdrawed from "../../components/CashWithdrawed";

export default function BoxId({ boxIdData, room }) {
  const thisIsTheBox = JSON.parse(boxIdData);
  const dataRoom = JSON.parse(room);

  const dispatch = useDispatch();

  const [dataBox, setDataBox] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);
  const [dataWithdraw, setDataWithdraw] = useState([]);

  const { showAdd, showWitdraw } = useSelector((state) => state.modalReducer);
  const { charge } = useSelector((state) => state.dateReducer);

  useEffect(() => {
    const fetchBox = async () => {
      await fetch("/api/box/boxrefresh", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${thisIsTheBox}`,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setDataBox(data.box);
        });
    };

    fetchBox();

    const fetchPayment = async () => {
      await fetch("/api/box/payment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setDataPayment(data.payment);
        });
    };
    fetchPayment();

    const fetchWithdraw = async () => {
      await fetch("/api/box/withdraw", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setDataWithdraw(data.withdraw);
        });
    };
    fetchWithdraw();
  }, [charge]);

  const rowsPayment = dataPayment
    .filter((box) => box.boxId._id === thisIsTheBox)
    .map((element) => (
      <tr key={element._id}>
        <td>{element.roomId.roomNumer}</td>
        <td>${new Intl.NumberFormat("es-MX").format(element.cash)}</td>
        <td>{element.typePayment}</td>
        <td>{element.reasonOfPay}</td>
        <td>{element.concept}</td>
        <td>{element.userId.firstName}</td>
        <td>{element.timeTransaction}</td>
      </tr>
    ))
    .reverse();
  // const priceCop = new Intl.NumberFormat("es-MX").format(thisPromo.price);

  const rowsWithdraw = dataWithdraw
    .filter((box) => box.boxId._id === thisIsTheBox)
    .map((element) => (
      <tr key={element._id}>
        <td>${new Intl.NumberFormat("es-MX").format(element.cash)}</td>
        <td>{element.typeWithdraw}</td>
        <td>{element.reasonOfWithdraw}</td>
        <td>{element.concept}</td>
        <td>{element.userId.firstName}</td>
        <td>{element.timeTransaction}</td>
      </tr>
    ))
    .reverse();

  const userCaja = dataBox.userIdOpenBox;

  return (
    userCaja && (
      <>
        <div className={styles.title__box}>
          <h1>{dataBox.nameBox}</h1>
        </div>
        <div className={styles.box__subtitle}>
          <h2>Flujo de Caja</h2>
          <h2>Caja abierta por: {dataBox.userIdOpenBox.firstName}</h2>
        </div>
        <div className={styles.oporto__service}>
          <BoxTable dataBox={dataBox} />
        </div>
        <div className={styles.container__buttons}>
          <div className={styles.buttons__add}>
            <button onClick={() => dispatch(showAddCashAction())}>
              Añadir Dinero
            </button>
          </div>
          <div className={styles.buttons__rest}>
            <button onClick={() => dispatch(showWithdrawCashAction())}>
              Retirar Dinero
            </button>
          </div>
        </div>
        <Divider size="sm" />
        <div className={styles.container__tabs}>
          <Tabs variant="outline">
            <Tabs.Tab label="Entradas" icon={<CashBanknote size={14} />}>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Habitación</th>
                    <th>Dinero Pagado</th>
                    <th>Metodo de Pago</th>
                    <th>Razon del Pago</th>
                    <th>Concepto</th>
                    <th>Quien Recibio Pago</th>
                    <th>Fecha Transacción</th>
                  </tr>
                </thead>
                <tbody>{rowsPayment}</tbody>
              </Table>
            </Tabs.Tab>
            <Tabs.Tab label="Salidas" icon={<CashBanknoteOff size={14} />}>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Dinero Retirado</th>
                    <th>Metodo de Pago</th>
                    <th>Razon del Pago</th>
                    <th>Concepto</th>
                    <th>Quien Realizó Retiro</th>
                    <th>Fecha Transacción</th>
                  </tr>
                </thead>
                <tbody>{rowsWithdraw}</tbody>
              </Table>
            </Tabs.Tab>
          </Tabs>
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
          opened={showAdd}
          onClose={() => dispatch(showAddCashAction())}
        >
          <CashReseived dataRoom={dataRoom} boxId={thisIsTheBox} />
        </PublicModal>
        <PublicModal
          opened={showWitdraw}
          onClose={() => dispatch(showWithdrawCashAction())}
        >
          <CashWithdrawed dataRoom={dataRoom} boxId={thisIsTheBox} />
        </PublicModal>
      </>
    )
  );
}

export async function getServerSideProps(context) {
  const { box } = context.query;
  console.log("este es context", box);
  const dataPromos = await getPostsPromo();
  const dataRoom = await getPostsRoomsData();
  const boxIdData = JSON.stringify(box);
  const room = JSON.stringify(dataRoom);
  return { props: { boxIdData, room } };
}
