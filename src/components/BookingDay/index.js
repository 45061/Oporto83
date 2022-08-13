/* eslint-disable react/jsx-no-useless-fragment */
import { useDispatch, useSelector } from "react-redux";
import { Popover, Tooltip, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setDataBooking } from "../../store/actions/dateAction";
import { showBookingDataAction } from "../../store/actions/modalAction";

import { colors } from "../../styles/theme";

export default function BookingsDay(props) {
  const dispatch = useDispatch();
  // console.log("esto es porps", props);
  const { clientName, lengthArray, firstDay, dataBooking } = props;
  const { numer, email, price, numerOfPeople } = dataBooking.userBookingId;
  console.log("esto es dataBooking", dataBooking);
  const dinerCopAdmin = new Intl.NumberFormat("es-MX").format(
    price * lengthArray
  );

  const [opened, { close, open }] = useDisclosure(false);

  const colorsStatus = {
    1: "green",
    2: "red",
    3: "blue",
    4: "purple",
  };
  console.log("este es el color", colorsStatus[dataBooking.reservedStatus]);

  function handeclick(event) {
    event.preventDefault();
    dispatch(setDataBooking(props));
    dispatch(showBookingDataAction());
  }

  return (
    <>
      <div>
        <Popover
          style={{ marginTop: 0, borderRadius: 30 }}
          sx={(theme) => ({
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: theme.colors.gray[1],
            },
          })}
          opened={opened}
          target={
            <Indicator
              color="red"
              size={16}
              withBorder
              inline
              label="Sin Pago"
              disabled={false}
            >
              <button
                onMouseEnter={open}
                onMouseLeave={close}
                onClick={handeclick}
              >
                <p>{clientName}</p>
              </button>
            </Indicator>
          }
          width={290}
          position="bottom"
          withArrow
        >
          <span>
            <h4>Cliente:</h4>
            <h5>{clientName}</h5>
          </span>
          <span>
            <h4>Número:</h4>
            <h5>{numer}</h5>
          </span>
          <span>
            <h4>email:</h4>
            <h5>{email}</h5>
          </span>
          <span>
            <h4>Noches:</h4>
            <h5>{lengthArray}</h5>
          </span>
          <span>
            <h4>Personas:</h4>
            <h5>{numerOfPeople}</h5>
          </span>
          <span>
            <h4>Valor Noches:</h4>
            <h5>${dinerCopAdmin}</h5>
          </span>
        </Popover>
      </div>

      <style jsx>{`
        div {
          margin-left: ${firstDay * 80 - 40}px;
          position: absolute;
          box-sizing: border-box;
        }
        span {
          display: flex;
          gap: 5px;
          align-items: center;
          margin: 0 0 0 15px;
        }
        button {
          width: ${lengthArray * 80 - 4}px;
          height: 24px;
          background-color: ${colorsStatus[dataBooking.reservedStatus]};
          color: white;
          transform: skew(120deg);
          padding: 0 10px;
          cursor: pointer;
          box-shadow: 1px 1px 3px #888;
          box-sizing: border-box;
          border: none;
        }
        h4 {
          margin: 0;
          color: ${colors.secondary};
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
        }
        h5 {
          margin: 0;
          color: grey;
        }
        p {
          margin: 0;
          transform: skew(-120deg);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
