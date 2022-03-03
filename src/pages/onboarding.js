//Next import
import Image from "next/image";
import Head from "next/head";

//React import
import { useEffect, useState, useRef } from "react";

//Near import
import { callFunction, wallet } from "../../near/near-setup";

//Icons import
import { HiUpload } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

//Default config import
import { avatarImage } from "../utils/default-config";

//Form input
import { useForm } from "react-hook-form";

//GSAP import
import gsap from "gsap";
import { errorSelector } from "recoil";

const OnBoarding = () => {
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef(null);
  const [bioLength, setBioLength] = useState(0);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isLoading) return;

    setIsLoading(true);

    const { fullName, bio } = data;

    callFunction("createProfile", {
      fullName,
      bio,
      skills,
      avatarUrl: avatarImage,
      accountId: wallet.getAccountId(),
    })
      .then((result) => {
        console.log(result);
        alert("Profile created successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating profile");
      });

    setIsLoading(false);
  };

  console.log(setIsLoading)

  watch((value) => setBioLength(value.bio.length));

  const skillsInput = watch("skills");

  useEffect(() => {
    if (!skillsInput) return;
    const skilllAray = skillsInput
      .split(",")
      .filter((skill) => skill.length > 0 && skill !== "");
    setSkills(skilllAray);
  }, [skillsInput]);

  useEffect(() => {
    // gsap.fromTo(
    //   "#hero_section",
    //   { y: 100, opacity: 0 },
    //   { duration: 1.2, y: 0, opacity: 1 }
    // );
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#EFF5F5] select-none">
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
            className={`h-[2.5rem] w-fit p-2 bg-decentra-turquoise rounded-lg self-center mt-[2rem] cursor-pointer transition-all duration-300 ${
              isLoading ? "bg-decentra-gray cursor-not-allowed" : ""
            }`}
            value={isLoading ? "Loading..." : "Submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
