//Next import
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

//React import
import { useEffect, useState, useRef } from "react";

//Component import
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";

//Near import
import {
  callFunction,
  wallet,
  signOut,
  viewFunction,
} from "../../near/near-setup";

//Toastify import
import { toast, ToastContainer } from "react-toastify";

//Icons import
import { HiUpload } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

//Default config import
import { avatarImage } from "../utils/default-config";

//Form input
import { useForm } from "react-hook-form";

//GSAP import
import gsap from "gsap";

//utils import
import { uploadFile } from "../utils/file-upload";

const OnBoarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [bioLength, setBioLength] = useState(0);
  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageRef = useRef(null);

  const router = useRouter();

  //Form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsSubmitting(true);

    const { fullName, bio } = data;

    const avatarUrl = profileImage
      ? await uploadFile(profileImage, "image")
      : avatarImage;

    callFunction("createProfile", {
      fullName,
      bio,
      skills,
      avatarUrl: avatarUrl,
      accountId: wallet.getAccountId(),
    })
      .then((_result) => {
        setIsSubmitting(false);
        toast.success("Profile created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  watch((value) => setBioLength(value.bio.length));

  const skillsInput = watch("skills");

  useEffect(() => {
    const nearId = wallet.getAccountId();
    //Checking if user is logged in
    if (!nearId) return router.replace("/");

    viewFunction("getProfile", { accountId: nearId })
      .then((result) => {
        if (result) return router.replace("/dashboard");
        else setIsLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (!skillsInput) return;
    const skilllAray = skillsInput
      .split(",")
      .filter((skill) => skill.length > 0 && skill !== "");
    setSkills(skilllAray);
  }, [skillsInput]);

  useEffect(() => {
    gsap.fromTo(
      "#hero_section",
      { y: 100, opacity: 0 },
      { duration: 1.2, y: 0, opacity: 1 }
    );
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-[#EFF5F5] select-none">
      <ToastContainer />
      <Head>
        <title>DecentraJobs | OnBoarding</title>
      </Head>

      <div
        className="w-[60rem] h-[40rem] bg-white rounded-lg shadow-lg p-4 flex flex-col"
        id="hero_section"
      >
        <span className="text-black font-semibold mb-[2rem]">DecentraJobs</span>

        {/*Avatar Image component  */}
        <div className="w-[5rem] h-[5rem] bg-bt-dark-gray rounded-lg self-center relative select-none shadow-lg">
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
              className=" bg-[#E2EDEE] h-[2rem] w-[2rem]  rounded-full flex justify-center items-center z-10"
            >
              <HiUpload className="text-[#297979] text-[1.3rem] cursor-pointer " />
            </div>
            <div
              onClick={() => {
                setProfileImage(null);
              }}
              className={`bg-[#E2EDEE] h-[2rem] w-[2rem]  rounded-full justify-center items-center z-10 ${
                profileImage ? "flex" : "hidden"
              }`}
            >
              <AiFillDelete className="text-[#297979] text-[1.3rem] cursor-pointer" />
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

        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <span className="text-black">Full Name:</span>
            <input
              className="outline-none w-[25rem] h-[2rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] "
              placeholder="John Doe"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* Bio */}
          <div className="flex flex-col w-[25rem]">
            <span>Bio:</span>
            <textarea
              placeholder="Tell us about yourself"
              className="outline-none w-[25rem] h-[5rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] resize-none"
              {...register("bio", {
                required: "This field is required",
                maxLength: {
                  message: "Bio cannot be longer than 140 characters",
                  value: 140,
                },
              })}
            />
            <span className="mt-1 self-end">{bioLength}/140</span>
            {errors.bio && (
              <span className="text-red-600">{errors.bio.message}</span>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-col w-[25rem]">
            <span>Skills:</span>
            <span className="text-gray-400 text-[.8rem]">
              Seperate skills with a comma (,)
            </span>
            <input
              placeholder="Show us your skills"
              className="outline-none w-[25rem] min-h-[2rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] resize-none"
              {...register("skills", {
                required: "This field is required",
              })}
            />

            {errors.skills && (
              <span className="text-red-600">{errors.skills.message}</span>
            )}
          </div>

          <input
            type="submit"
            className={`h-[2.5rem] w-fit p-2  rounded-lg self-center mt-[2rem] cursor-pointer transition-all duration-300 ${
              isSubmitting
                ? "bg-decentra-gray cursor-not-allowed"
                : "bg-decentra-turquoise"
            }`}
            value={isSubmitting ? "Loading..." : "Submit"}
          />
        </form>

        <span
          className="self-center mt-[1.5rem] cursor-pointer"
          onClick={() => {
            signOut();
            router.replace("/");
          }}
        >
          Use a different account
        </span>
      </div>
    </div>
  );
};

export default OnBoarding;
