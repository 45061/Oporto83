import Slideshow from "../Slideshow";
import styles from "../../styles/components/Slide.module.scss";

export default function Slide() {
  return (
    <div className={styles.main}>
      <div className={styles.main__title}>
        <h2>Disfruta tu estadia en Oporto 83</h2>
      </div>
      <Slideshow controles autoplay velocidad="5000" intervalo="7000">
        <div className={styles.slide}>
          <img src="/image1.png" alt="hotel1" />
        </div>
        <div className={styles.slide}>
          <img src="/image2.png" alt="hotel1" />
        </div>
        <div className={styles.slide}>
          <img src="/image3.png" alt="hotel1" />
        </div>
        <div className={styles.slide}>
          <img src="/image4.png" alt="hotel1" />
        </div>
      </Slideshow>
    </div>
  );
}
