//React import
import { useLayoutEffect, useState } from "react";

//Form input
import { useForm } from "react-hook-form";

//Component import
import Modal from "../modal/modal";

const CreateProjectModal = ({ isModalOpen, setIsModalOpen }) => {
  const [minDate, setMinDate] = useState(new Date());

  const [isSubmitting , setIsSubmitting] = useState(false)

  //Setting min deadline date to be the next day
  useLayoutEffect(() => {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    let tomorrow = yyyy + "-" + mm + "-" + dd;
    setMinDate(tomorrow);
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Create Project"
    >
      <form className="flex flex-col gap-y-4">
        {/* Title */}
        <div className="flex flex-col">
          <span>Project Title : </span>
          <input
            className="w-[20rem] h-[3rem] outline-none bg-decentra-lightblue rounded-lg p-2"
            placeholder="Important Project"
          />
        </div>

        {/* Dates  */}
        <div className="flex flex-col">
          <span>Deadline : </span>
          <input
            type="date"
            min={minDate}
            className="w-[20rem] h-[3rem] bg-decentra-lightblue rounded-lg p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <span>Project Description: </span>
          <textarea
            placeholder="Tell us about the project"
            className="outline-none w-[25rem] h-[6rem] p-2 bg-[#E2EDEE] rounded-lg border-[2px] border-transparent focus:border-[#297979] resize-none"
          />
        </div>
        {/* Project Brief */}
        <div>
          <span>Project Brief:</span>
          <div className="flex flex-col w-[25rem] h-[6rem] bg-decentra-lightblue border-dashed border-[1px] border-decentra-green rounded-lg items-center justify-center">
            <span>Drag & Drop</span>
            <span>Or</span>
            <span>Click here</span>
          </div>
        </div>

        {/* Submit */}
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
    </Modal>
  );
};

export default CreateProjectModal;
