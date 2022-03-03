//Next import
import Image from "next/image";
import Head from "next/head";

//React import
import { useEffect, useState, useRef } from "react";

//Icons import
import { HiUpload } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

//Default config import
import { avatarImage } from "../utils/default-config";

//GSAP import
import gsap from "gsap";

const OnBoarding = () => {
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // gsap.fromTo(
    //   "#hero_section",
    //   { y: 100, opacity: 0 },
    //   { duration: 1.2, y: 0, opacity: 1 }
    // );
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-decentra-gray select-none">
      <Head>
        <title>DecebtraJobs | OnBoarding</title>
      </Head>

      <div
        className="w-[60rem] h-[40rem] bg-decentra-turquoise rounded-lg shadow-lg p-4 flex flex-col"
        id="hero_section"
      >
        <span className="text-white font-semibold mb-[4rem]">DecentraJobs</span>

        {/*Avatar Image component  */}
        <div className="w-[5rem] h-[5rem] bg-bt-dark-gray rounded-lg self-center relative select-none">
          <Image
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : `/api/imageproxy?url=https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png`
            }
            className="rounded-lg object-cover "
            unoptimized
            width="100%"
            height="100%"
            alt="avatar"
          />
          <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-x-1.5 justify-center items-center">
            <div
              onClick={() => {
                console.log(imageRef);
                if (imageRef.current === null) return;
                imageRef.current.click();
              }}
              className=" bg-bt-tab-bg h-[2rem] w-[2rem]  rounded-full flex justify-center items-center z-10"
            >
              <HiUpload className="text-black text-[1.3rem] cursor-pointer " />
            </div>
            <div
              onClick={() => {
                setProfileImage(null);
              }}
              className={`bg-bt-tab-bg h-[2rem] w-[2rem]  rounded-full justify-center items-center z-10 ${
                profileImage ? "flex" : "hidden"
              }`}
            >
              <AiFillDelete className="text-blackĞ text-[1.3rem] cursor-pointer" />
            </div>
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={imageRef}
            className="invisible"
            onChange={(e) => {
              if (e.target.files === null) return;
              setProfileImage(e.target.files[0]);
            }}
          />
        </div>

        <span className="text-white">Full Name:</span>
      </div>
    </div>
  );
};

export default OnBoarding;
