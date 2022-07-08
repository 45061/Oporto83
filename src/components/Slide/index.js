import { colors } from "../../styles/theme";
import Slideshow from "../Slideshow";

export default function Slide() {
  return (
    <>
      <main>
        <div>
          <h2>Disfruta tu estadia en Oporto 83</h2>
        </div>
        <Slideshow controles autoplay velocidad="5000" intervalo="7000">
          <slide>
            <img src="/image1.png" alt="hotel1" />
          </slide>
          <slide>
            <img src="/image2.png" alt="hotel1" />
          </slide>
          <slide>
            <img src="/image3.png" alt="hotel1" />
          </slide>
          <slide>
            <img src="/image4.png" alt="hotel1" />
          </slide>
        </Slideshow>
      </main>
      <style jsx>
        {`
          main {
            overflow: hidden;
            max-width: 1000px;
            margin: 10px, auto;
          }
          div {
            background-color: ${colors.secondary};
            padding: 2px;
          }
          h2 {
            margin: 0;
            font-size: 34px;
            text-align: center;
            color: white;
          }
          slide {
            min-width: 100%;
            overflow: hidden;
            transition: 0.3s ease all;
            z-index: 10;
            max-height: 400px;
            position: relative;
          }
          img {
            width: 100%;
            vertical-align: top;
          }
        `}
      </style>
    </>
  );
}
