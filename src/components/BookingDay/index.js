/* eslint-disable react/jsx-no-useless-fragment */
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Indicator } from "@mantine/core";
import { setDataBooking } from "../../store/actions/dateAction";
import { showBookingDataAction } from "../../store/actions/modalAction";

export default function BookingsDay(props) {
  const dispatch = useDispatch();
  // console.log("esto es porps", props);
  const { clientName, lengthArray, firstDay, dataBooking } = props;
  const { numer, email, price, numerOfPeople } = dataBooking.userBookingId;
  console.log("esto es dataBooking", dataBooking);
  const dinerCopAdmin = new Intl.NumberFormat("es-MX").format(price);
  const hola = `Cliente: ${clientName}  \\  Numero: ${numer}  \\ email: ${email}  \\ Noches: ${lengthArray} \\ Personas: ${numerOfPeople} \\ Valor: $${dinerCopAdmin}`;

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
        <Tooltip
          multiline
          label={hola}
          transition="fade"
          color="indigo"
          withArrow
          arrowSize={6}
          transitionDuration={200}
        >
          <Indicator
            color="red"
            size={16}
            withBorder
            inline
            label="Sin Pago"
            disabled={false}
          >
            <button onClick={handeclick}>
              <p>{clientName}</p>
            </button>
          </Indicator>
        </Tooltip>
      </div>

      <style jsx>{`
        div {
          margin-left: ${firstDay * 80 - 40}px;
          position: absolute;
          box-sizing: border-box;
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
