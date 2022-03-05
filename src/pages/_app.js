import "../styles/globals.css";

//React imports
import { useLayoutEffect } from "react";

//Near imports
import { initNear } from "../../near/near-setup";

//Recoil import
import { RecoilRoot } from "recoil";

//Toastify css import
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  //Initialize Near when the app starts
  useLayoutEffect(() => {
    initNear();
  }, []);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
