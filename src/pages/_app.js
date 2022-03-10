import "../styles/globals.css";

//React imports
import { useEffect, useState } from "react";

//Component import
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";

//Near imports
import { initNear } from "../../near/near-setup";

//Recoil import
import { RecoilRoot } from "recoil";

//Toastify css import
import "react-toastify/dist/ReactToastify.css";

//Toastify import
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  //Initialize Near when the app starts
  useEffect(() => {
    initNear();
    setIsLoading(false)
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <RecoilRoot>
      <Component {...pageProps} />
      <ToastContainer />
    </RecoilRoot>
  );
}

export default MyApp;
