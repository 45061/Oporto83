import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import { wrapper, store } from "../store/store";
import AppLayout from "../components/AppLayout";
import NavBar from "../components/Navbar";
import "../styles/globals.scss";
import { getUerData } from "../store/actions/authAction";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const token = cookies.get("token");
  useEffect(() => {
    if (token) {
      dispatch(getUerData(token));
    }
  }, [token, dispatch]);
  return (
    <>
      <Head>
        <title>Oporto 83</title>
        <meta name="oporto83" content="About that Oporto83" />
        <link rel="icon" href="/oporto.png" />
      </Head>
      <Provider store={store}>
        <NavBar />
        <AppLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </AppLayout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
