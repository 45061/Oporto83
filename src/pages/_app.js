import { Provider } from "react-redux";
import { wrapper, store } from "../store/store";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
