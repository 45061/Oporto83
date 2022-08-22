import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Select } from "@mantine/core";
import { BrandBooking } from "tabler-icons-react";
import InputValidator from "../ImputValidator";

import styles from "../../styles/components/Register.module.scss";
import stylesHome from "../../styles/Home.module.scss";

import Calendar from "../Calendar";
import { postBookingAdmin } from "../../store/actions/dateAction";

const dayOfYear = require("dayjs/plugin/dayOfYear");

dayjs.extend(dayOfYear);

export default function RBookingAdmin({ dataRoom }) {
  const { dates } = useSelector((state) => state.dateReducer);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  // const [dataRoom, setDataRooms] = useState([]);

  const firstDay = dayjs(dates[0]).dayOfYear();
  const secondDay = dayjs(dates[1]).dayOfYear();
  const reservedDays = secondDay - firstDay;

  const dataBooking = {
    roomId: value._id,
    checkIn: `${new Date(dates[0]).getDate()}/${
      new Date(dates[0]).getMonth() + 1
    }/${new Date(dates[0]).getFullYear()}`,
    checkOut: `${new Date(dates[1]).getDate()}/${
      new Date(dates[1]).getMonth() + 1
    }/${new Date(dates[1]).getFullYear()}`,
    bookingDays: dates,
    reservedDays,
    reservedStatus: 1,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numer: "",
    numerOfPeople: "",
    price: "",
    bookingOfPlace: "",
    breakfast: "",
    parking: "",
  });
  const { rooms } = dataRoom;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handelclick = async (event) => {
    event.preventDefault();

    const dataSend = {
      formData,
      dataBooking,
    };
    dispatch(postBookingAdmin(dataSend));

    // dispatch(hiddeRegisterForm());
  };

  // useEffect(() => {
  //   const fetchDataRooms = async () => {
  //     await fetch("/api/rooms", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         setDataRooms(data);
  //       });
  //   };
  //   fetchDataRooms();
  // }, []);

  return (
    rooms && (
      <form className={styles.register}>
        <header className={styles.register__header}>
          <div className={styles.register__brand}>
            {/* <div className={styles.register__brand}> */}
            <img src="/oporto.png" alt="logoOporto" />
            {/* </div> */}
          </div>
          <p className={styles.register__title}> Crea reserva en Oporto 83</p>
        </header>
        <div className={styles.register__content}>
          <InputValidator
            name="firstName"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Nombres"
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
            required
          />
          <InputValidator
            name="lastName"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Apellidos"
            onChange={onChange}
            errorMessage="Apellido no debe estar vacio"
            required
          />
          <InputValidator
            name="email"
            value={formData.name}
            type="email"
            classname={styles.register__input}
            placeholder="Email"
            onChange={onChange}
            errorMessage="Debe ser email valido"
            required
          />
          <InputValidator
            name="numer"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Numero"
            onChange={onChange}
            errorMessage="Numero no debe estar vacio"
            required
          />
          <InputValidator
            name="numerOfPeople"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Numero de Personas"
            onChange={onChange}
            errorMessage="Numero no debe estar vacio"
            required
          />
          <InputValidator
            name="price"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Valor Reserva"
            onChange={onChange}
            errorMessage="Numero no debe estar vacio"
            required
          />
          <InputValidator
            name="bookingOfPlace"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Lugar de Reserva"
            onChange={onChange}
            errorMessage="No debe estar vacio"
            required
          />
          <InputValidator
            name="breakfast"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Desayuno"
            onChange={onChange}
            errorMessage="No debe estar vacio"
            required
          />
          <InputValidator
            name="parking"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Parqueadero"
            onChange={onChange}
            errorMessage="No debe estar vacio"
            required
          />
        </div>
        <div className={stylesHome.booking}>
          <Select
            required
            maxDropdownHeight={380}
            icon={<BrandBooking size={14} />}
            value={value}
            onChange={setValue}
            label="Selecciona la habitación a reservar"
            placeholder={value.roomNumer}
            data={rooms.map((item) => ({
              value: item,
              label: `${item.roomNumer}`,
            }))}
          />
          <Calendar room={value} />
          <div className={stylesHome.booking__button}>
            <button onClick={handelclick}>Realizar Reserva</button>
          </div>
        </div>
        <div className={styles.register__footer}></div>
      </form>
    )
  );
}
