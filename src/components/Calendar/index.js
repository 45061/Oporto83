import dayjs from "dayjs";
import { RangeCalendar } from "@mantine/dates";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Collapse, Divider } from "@mantine/core";
import { setDataDate } from "../../store/actions/dateAction";
import style from "../../styles/components/CollapseCalendar.module.scss";

export default function Calendar() {
  const dispatch = useDispatch();

  const thisDay = dayjs().$D - 1;
  const day = dayjs().$D;
  const nextDay = day + 1;
  const thisDayData = dayjs().$d;
  const nextThisDayData = dayjs().date(nextDay).$d;

  const [opened, setOpen] = useState(false);
  const [value, setValue] = useState([
    new Date(thisDayData),
    new Date(nextThisDayData),
  ]);
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

  const dataDate = dayjs(value[0]);
  const nextDataDate = dayjs(value[1]);
  const dateConst = dataDate.$D + 1;
  const infoDateConst = dayjs().date(dateConst);

  // const thisDayWeek = dayjs().$W;
  // const thisMonth = dayjs().$M;

  // console.log("esta es la prueba", dayjs(value[1]));

  // console.log(week[thisDayWeek + 1]);
  useEffect(() => {
    dispatch(setDataDate(value));
  }, [value, dispatch]);

  return (
    <>
      <Button
        onClick={() => setOpen((o) => !o)}
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
          <Divider sx={{ height: "44px" }} size="sm" orientation="vertical" />
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

      <Collapse
        in={opened}
        transitionDuration={800}
        transitionTimingFunction="linear"
      >
        <RangeCalendar
          value={value}
          onChange={setValue}
          minDate={dayjs(new Date())
            .startOf("month")
            .add(thisDay, "days")
            .toDate()}
          amountOfMonths={2}
        />
      </Collapse>
    </>
  );
}
