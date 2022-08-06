/* eslint-disable react/jsx-no-useless-fragment */
export default function BookingsDay(props) {
  const { clientName, clientLastName, lengthArray, firstDay } = props;
  return (
    <>
      <div>
        <p>
          {clientName} {clientLastName}
        </p>
      </div>
      <style jsx>{`
        div {
          width: ${lengthArray * 80}px;
          margin-left: ${firstDay * 80 - 40}px;
          position: absolute;
          height: 24px;
          background-color: red;
          overflow: hidden;
          text-overflow: ellipsis;
          color: white;
          white-space: nowrap;
          transform: skew(120deg);
          padding: 0 10px;
        }
        p {
          margin: 0;
          transform: skew(-120deg);
        }
      `}</style>
    </>
  );
}
