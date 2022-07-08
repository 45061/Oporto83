import Image from "next/image";
import AppLayout from "../../components/AppLayout";
import NavBar from "../../components/Navbar";
import styles from "../../styles/Home.module.scss";

export default function rooms() {
  return (
    <div>
      <NavBar />
      <AppLayout>
        <h1>Estas son las Habitaciones</h1>
      </AppLayout>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
