//NextJS import
import Image from "next/image";

//React import
import { useLayoutEffect, useState, useRef, useEffect } from "react";

//Near import
import { wallet, callFunction } from "../../../near/near-setup.js";

//Form input
import { useForm } from "react-hook-form";

//Component import
import Modal from "../modal/modal";

//Assets import
import Near from "../../../public/assets/images/near.svg";

//Icons import
import { HiDocumentText } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

//utils import
import { uploadFile } from "../../utils/file-upload";

//Toastify import
import { toast } from "react-toastify";

//Recoil import
import { useRecoilState } from "recoil";
import { projectsList, updateData, userProfile } from "../../recoil/state";

const CreatePortfolioProjectModal = ({ isModalOpen, setIsModalOpen }) => {
  //Recoil
  const [_user, setUserProfile] = useRecoilState(userProfile);
  const [_projects, setProjects] = useRecoilState(projectsList);

  //UseStates
  const [maxDate, setMaxDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brief, setBrief] = useState(null);
  const [isDraggedEnter, setIsDraggedEnter] = useState(false);
  const [tagsArray, setTagsArray] = useState([]);

  //Form hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { title, createdOn, projectUrl, description } = data;

    const url = brief ? await uploadFile(brief, "image") : "null";

    callFunction(
      "addPortfolioProject",
      {
        title,
        description,
        createdOn,
        imgUrl: url,
        tags: tagsArray,
        projectUrl
      },
    )
      .then((data) => {
        updateData(setProjects, setUserProfile);
        toast.success("Project Created Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsSubmitting(false);
      })
      .catch((err) => {
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

  const tags = watch("tags");



  //Refs
  const briefRef = useRef(null);

  //Project brief section methods
  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDraggedEnter(true);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    setBrief(e.dataTransfer.files[0]);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedEnter(false);
  };

  //Setting max project creation date to today
  useLayoutEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    let date = yyyy + "-" + mm + "-" + dd;
    setMaxDate(date);
  }, []);

  useEffect(() => {
    if (!tags) return;
    const tempTags = tags
      .split(",")
      .filter((tag) => tag.length > 0 && tag !== "");
    setTagsArray(tempTags);
  }, [tags]);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Create Portfolio Project"
    >
      <input
        id="brief"
        type="file"
        ref={briefRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          setBrief(e.target.files[0]);
        }}
      />
      <form
        className="flex flex-col gap-y-4 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-x-6">
          {/* Title */}
          <div className="flex flex-col">
            <span>Project Title : </span>
            <input
              {...register("title", { required: true })}
              className="w-[20rem] h-[3rem] outline-none bg-decentra-lightblue rounded-lg p-2"
              placeholder="Important Project"
            />
            {errors.title && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* Dates  */}
          <div className="flex flex-col">
            <span>Project Creation Date : </span>
            <input
              {...register("createdOn", { required: true })}
              type="date"
              max={maxDate}
              className="w-[20rem] h-[3rem] bg-decentra-lightblue rounded-lg p-2"
            />
            {errors.deadline && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col">
          <span>Project Description: </span>
          <textarea
            {...register("description", { required: true })}
            placeholder="Tell us about the project"
            className="outline-none w-[41.5rem] h-[7rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] resize-none"
          />
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <span>Tags : </span>
          <span className="text-gray-400 text-[.8rem]">
            Seperate tags by a comma (,)
          </span>
          <input
            {...register("tags", { required: true })}
            className="w-[41.5rem] h-[3rem] outline-none bg-decentra-lightblue rounded-lg p-2"
            placeholder="Tags"
          />
          {errors.tags && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Project Link */}
        <div className="flex flex-col">
          <span>Project Link : </span>
          <input
            type="url"
            {...register("projectUrl", { required: true, type: "url" })}
            className="w-[41.5rem] h-[3rem] outline-none bg-decentra-lightblue rounded-lg p-2"
            placeholder="www.myproject.com"
          />
          {errors.tags && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Project Brief */}
        <div>
          <span>Project Image:</span>
          {!brief ? (
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className={`flex flex-col w-[41.5rem] h-[7rem] bg-decentra-lightblue border-[1px] border-decentra-green rounded-lg items-center justify-center cursor-pointer ${
                isDraggedEnter ? "border-solid" : "border-dashed"
              } `}
              onClick={() => briefRef.current.click()}
            >
              <span>Drag & Drop</span>
              <span>Or</span>
              <span>Click here</span>
            </div>
          ) : (
            <div className="flex items-center mt-4 gap-x-2">
              <HiDocumentText className="text-[1.5rem] text-decentra-green" />
              <span>{brief.name}</span>
              <AiOutlineDelete
                className="text-[1.5rem] cursor-pointer ml-auto"
                onClick={() => {
                  setIsDraggedEnter(false);
                  setBrief(null);
                }}
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <input
          type="submit"
          className={`h-[2.5rem] w-fit p-2 rounded-lg self-center mt-auto cursor-pointer transition-all duration-300 ${
            isSubmitting
              ? "bg-decentra-gray cursor-not-allowed"
              : "bg-decentra-turquoise"
          }`}
          value={isSubmitting ? "Loading..." : "Submit"}
        />
      </form>
    </Modal>
  );
};

export default CreatePortfolioProjectModal;
