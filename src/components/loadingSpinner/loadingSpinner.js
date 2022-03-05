//Spinner import
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ClipLoader color={"#399E5A"} loading={true} size={50} />
    </div>
  );
};

export default LoadingSpinner;
