/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-useless-fragment */
import { ScrollArea, Select } from "@mantine/core";
import dayjs from "dayjs";
import { BrandBooking } from "tabler-icons-react";
import { useState } from "react";
import styles from "../../styles/components/BookingsTable.module.scss";
import BookingsDay from "../BookingDay";

export default function BookingsTable(props) {
  const { data, roomsData } = props;
  const { rooms } = roomsData;

  const thisMount = dayjs().$M;
  const [value, setValue] = useState(`${thisMount}`);
  const [celda, setCelda] = useState("");

  const showAndHide = (id) => {
    const theElement = document.getElementById(id);
    if (theElement.style.display === "none") {
      theElement.style.display = "";
    } else {
      theElement.style.display = "none";
    }
  };

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  const monthOfYear = parseInt(value, 10) + 1;
  const year = dayjs().$y;

  const d = new Date(year, monthOfYear, 0);

  const daysOfMount = d.getDate();

  const arrDays = [];
  for (let i = 1; i <= daysOfMount; i++) {
    arrDays.push(i);
  }

  const month = {
    0: "Enero",
    1: "Febrero",
    2: "Marzo",
    3: "Abril",
    4: "Mayo",
    5: "Junio",
    6: "Julio",
    7: "Agosto",
    8: "Septiembre",
    9: "Octubre",
    10: "Noviembre",
    11: "Diciembre",
  };

  const week = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mie",
    4: "Jue",
    5: "Vie",
    6: "Sab",
  };

  const daysOfTable = arrDays.map((element) => (
    <div className={styles.calendar__dayOfMounth} key={element}>
      <div>{week[dayjs().month(value).date(element).$W]}</div>
      <div>{element}</div>
    </div>
  ));

  const daysOfTableInThisMounth = arrDays.map((element) => (
    <div className={styles.room__days} key={element}></div>
  ));

  function Occupation2(room) {
    const dataIni = room.bookings;
    const BookingDates = [];
    dataIni?.forEach((index) => {
      const arrayDays = getDates(
        new Date(index.bookingDays[0]),
        new Date(index.bookingDays[1])
      );

      const dates = arrayDays
        .toString()
        .split(",")
        .filter(
          (mount) => parseInt(dayjs(mount).$M, 10) === parseInt(value, 10)
        )
        .map((item) => dayjs(item).$D);

      let lengthArray = 0;
      if (dates.length === 1) {
        lengthArray = 0.5;
      }
      if (dates.length !== 1) {
        lengthArray = dates.length - 1;
      }

      const firstDay = dates[0];
      if (dates.length != 0) {
        const clientNameArray = [];
        const dataUser = [];
        if (!index.userBookingId) {
          clientNameArray.push(index.userId.firstName);
          clientNameArray.push(index.userId.lastName);
          dataUser.push(index.userId);
        }
        if (index.userBookingId) {
          clientNameArray.push(index.userBookingId.firstName);
          clientNameArray.push(index.userBookingId.lastName);
          dataUser.push(index.userBookingId);
        }

        const clientName = clientNameArray.join(" ");
        BookingDates.push(
          <BookingsDay
            clientName={clientName}
            lengthArray={lengthArray}
            firstDay={firstDay}
            dataBooking={index}
            room={room}
            key={room.bookings[0]._id}
          />
        );
      }
    });
    return BookingDates;
  }
  function Occupation(room) {
    const dataIni = room[0].bookings;
    // const dataBookingIni= dataIni.filter((mount)=> mount.bookingDays[0])
    const BookingDates = [];
    dataIni?.forEach((index) => {
      BookingDates.push(
        getDates(new Date(index.bookingDays[0]), new Date(index.bookingDays[1]))
      );
    });

    const dates = BookingDates.toString()
      .split(",")
      .filter((mount) => dayjs(mount).$M == value)
      .map((item) => dayjs(item).$D);

    const arrMount = () => {
      const arrayMount = [];
      for (let i = 1; i <= daysOfMount; i++) {
        const bolean = dates.some((num) => num === i);
        if (bolean) {
          arrayMount.push(i);
        } else {
          arrayMount.push(0);
        }
      }
      return arrayMount;
    };

    const datos = dataIni.map((booking) => {
      const firstDay = dayjs(booking.bookingDays[0]).$D;
      const secondDay = dayjs(booking.bookingDays[1]).$D;
      const arrBookHab = [];

      for (let i = firstDay; i <= secondDay; i++) {
        arrBookHab.push(i);
      }
      return arrBookHab;
    });

    const book = arrMount().map((day) => {
      if (day === 0) {
        return <td></td>;
      }
      for (let i = 0; i <= datos.length; i++) {
        const numsArray = datos[i].some((num) => num === day);
        if (numsArray) {
          return (
            <td
              id={i}
              onClick={() => setCelda({ i })}
              className={styles.booking__table}
            ></td>
          );
        }
      }
    });

    return book;
  }
  const handleclick = () => {};

  const nameRooms = rooms?.map((room) => (
    <div className={styles.rooms__dataDays} key={room.roomNumer}>
      <p>{room.roomNumer}</p>
    </div>
  ));

  const dataRooms = rooms?.map((room) => {
    const roomDataBooking = Occupation2(room);
    return (
      <div className={styles.mounth_room} key={room.roomNumer}>
        <div className={styles.room__table}>{daysOfTableInThisMounth}</div>
        <div className={styles.room__data}>{roomDataBooking}</div>
      </div>
    );
  });

  return (
    <div className={styles.conteiner__calendar}>
      <Select
        required
        maxDropdownHeight={380}
        icon={<BrandBooking size={14} />}
        value={value}
        onChange={setValue}
        label="Selecciona el mes"
        placeholder="Mes a seleccionar"
        data={[
          {
            value: "0",
            label: "Enero",
          },
          {
            value: "1",
            label: "Febrero",
          },
          {
            value: "2",
            label: "Marzo",
          },
          {
            value: "3",
            label: "Abril",
          },
          {
            value: "4",
            label: "Mayo",
          },
          {
            value: "5",
            label: "Junio",
          },
          {
            value: "6",
            label: "Julio",
          },
          {
            value: "7",
            label: "Agosto",
          },
          {
            value: "8",
            label: "Septiembre",
          },
          {
            value: "9",
            label: "Octubre",
          },
          {
            value: "10",
            label: "Noviembre",
          },
          {
            value: "11",
            label: "Diciembre",
          },
        ]}
      />
      <ScrollArea style={{ width: 1500, height: 710, marginTop: 20 }}>
        <div className={styles.calendar}>
          <div className={styles.calendar__rooms}>{nameRooms}</div>
          <div className={styles.calendar__mounth}>
            <div className={styles.mounth__days}>{daysOfTable}</div>
            {dataRooms}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
