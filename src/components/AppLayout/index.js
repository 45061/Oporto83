import { colors, breakpoints } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export default function AppLayout({ children }) {
  return (
    <>
      <span>
        <div>{children}</div>
      </span>
      <style jsx>
        {`
          span {
            display: grid;
            height: 100%;
            place-items: center;
          }
          div {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            margin-top: 100px;
            height: 100%;
            width: 100%;
          }
          @media (min-width: ${breakpoints.mobile}) {
            div {
              margin-top: 180px;
              height: 96%;
              width: 82%;
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          html,
          body {
            background-image: radial-gradient(
                ${backgroundColor} 1px,
                transparent 1px
              ),
              radial-gradient(${backgroundColor} 1px, transparent 1px);
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
          }
        `}
      </style>
    </>
  );
}
