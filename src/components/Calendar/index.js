/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/jsx-no-useless-fragment */
import dayjs from "dayjs";
import "dayjs/locale/es";
import { RangeCalendar } from "@mantine/dates";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Divider, Popover } from "@mantine/core";
import { setDataDate } from "../../store/actions/dateAction";
import style from "../../styles/components/CollapseCalendar.module.scss";

export default function Calendar(props) {
  const { room, initialDay } = props;
  const dispatch = useDispatch();

  const thisDay = dayjs().$D - 1;
  const day = dayjs().$D;
  const nextDay = day + 1;
  const thisDayData = dayjs().$d;
  const nextThisDayData = dayjs().date(nextDay).$d;

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState([
    new Date(thisDayData),
    new Date(nextThisDayData),
  ]);
  const dataIni = room?.bookings;

  const month = {
    0: "Ene",
    1: "Feb",
    2: "Mar",
    3: "Abr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Ago",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dic",
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

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate < endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  const BookingDates = [];
  dataIni?.forEach((index) => {
    BookingDates.push(
      getDates(new Date(index.bookingDays[0]), new Date(index.bookingDays[1]))
    );
  });

  const dataDate = dayjs(value[0]);
  const nextDataDate = dayjs(value[1]);
  const dateConst = dataDate.$D + 1;
  const infoDateConst = dayjs().date(dateConst);
  const newBookingDates = BookingDates.toString().split(",");

  useEffect(() => {
    dispatch(setDataDate(value));
  }, [value, dispatch]);

  return (
    <>
      <Popover
        style={{ marginTop: 5, borderRadius: 30 }}
        sx={(theme) => ({
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        })}
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <Button
            onClick={() => setOpened(true)}
            style={{
              width: 250,
              height: 80,
              backgroundColor: "transparent",
              color: "black",
            }}
          >
            <div className={style.calendar}>
              <div className={style.firtsday}>
                <h1>{dataDate.$D}</h1>
                <div className={style.firtsday_month}>
                  <h3>{month[dataDate.$M]}</h3>
                  <p>{week[dataDate.$W]}</p>
                </div>
              </div>
              <Divider
                sx={{ height: "44px" }}
                size="sm"
                orientation="vertical"
              />
              <div className={style.firtsday}>
                <h1>{nextDataDate.$D ? nextDataDate.$D : infoDateConst.$D}</h1>
                <div className={style.firtsday_month}>
                  <h3>
                    {nextDataDate.$M
                      ? month[nextDataDate.$M]
                      : month[infoDateConst.$M]}
                  </h3>
                  <p>
                    {nextDataDate.$W
                      ? week[nextDataDate.$W]
                      : week[infoDateConst.$W]}
                  </p>
                </div>
              </div>
            </div>
          </Button>
        }
        width={590}
        position="bottom"
        withArrow
      >
        <RangeCalendar
          value={value}
          onChange={setValue}
          minDate={initialDay}
          excludeDate={(date) =>
            newBookingDates.some(
              (dates) => date.getTime() === new Date(dates).getTime()
            )
          }
          amountOfMonths={2}
          locale="es-mx"
        />
      </Popover>
    </>
  );
}
