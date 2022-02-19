import "../styles/globals.css";

//React imports
import { useLayoutEffect } from "react";

//Near imports
import { initNear } from "../../near/near-setup";

function MyApp({ Component, pageProps }) {
  //Initialize Near when the app starts
  useLayoutEffect(() => {
    initNear();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
