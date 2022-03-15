//React import
import { useState, useRef } from "react";

//Icons import
import { HiDocumentText } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

//Form input
import { useForm } from "react-hook-form";

//Utils import
import { uploadFile } from "../../utils/file-upload";

//Near import
import { callFunction } from "../../../near/near-setup";

const ApplicationForm = ({ setIsApplying, projectId }) => {
  //UseStates
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brief, setBrief] = useState(null);
  const [isDraggedEnter, setIsDraggedEnter] = useState(false);

  //Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   const onSubmit = async (data) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const { title, description } = data;

//     const url = brief ? await uploadFile(brief, "pdf") : "null";

//     callFunction("createProposal", {
//       projectId: projectId,
//       proposalTitle: title,
//       proposalDescription: description,
//       proposalBrief: url,
//     })
//       .then((data) => {
//         toast.success("Proposal Created Successfully", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setIsSubmitting(false);
//       })
//       .catch((err) => {
//         setIsSubmitting(false);
//         toast.error(err.kind.ExecutionError.split(",")[0], {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   };

  //Refs
  const briefRef = useRef(null);

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

  return (
    <form
      className="flex flex-col gap-y-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="brief"
        type="file"
        ref={briefRef}
        className="hidden"
        accept="application/pdf"
        onChange={(e) => {
          setBrief(e.target.files[0]);
        }}
      />
      <div className="flex gap-x-6">
        {/* Title */}
        <div className="flex flex-col">
          <span>Proposal Title : </span>
          <input
            {...register("title", { required: true })}
            className="w-[41.5rem] h-[3rem] outline-none bg-decentra-lightblue rounded-lg p-2"
            placeholder="Best Freelancer!"
          />
          {errors.title && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col">
        <span>Proposal Description: </span>
        <textarea
          {...register("description", { required: true })}
          placeholder="Write down your proposal"
          className="outline-none w-[41.5rem] h-[12rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] resize-none"
        />
        {errors.description && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>

      {/* Project Brief */}
      <div>
        <span>Proposal Brief:</span>
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

      <div className="flex gap-x-2 justify-center items-center">
        {/* Cancel */}
        <button
          onClick={() => {
            if (isSubmitting) return;
            setIsApplying(false);
          }}
          className={`h-[2.5rem] w-fit p-2 rounded-lg self-center mt-auto cursor-pointer transition-all duration-300 bg-red-600 text-white `}
          value={isSubmitting ? "Loading..." : "Submit"}
        >
          Cancel
        </button>
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
      </div>
    </form>
  );
};

export default ApplicationForm;
