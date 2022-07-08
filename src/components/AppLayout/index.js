import { colors, breakpoints } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>
        {`
          div {
            display: grid;
            height: 150vh;
            place-items: center;
          }
          main {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            margin-top: 100px;
            height: 100%;
            width: 100%;
          }
          @media (min-width: ${breakpoints.mobile}) {
            main {
              margin-top: 140px;
              height: 300vh;
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
