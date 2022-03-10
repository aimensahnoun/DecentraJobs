//NextJS import
import Image from "next/image";

//Components import
import Modal from "../modal/modal";

//Near import
import { viewFunction, utils } from "../../../near/near-setup";

//React import
import { useLayoutEffect, useState } from "react";

//Assets import
import Near from "../../../public/assets/images/near.svg";

//Icon import
import { HiDocumentText } from "react-icons/hi";

const ProjectDetails = ({ isModalOpen, setIsModalOpen, projectId }) => {
  const [project, setProject] = useState(null);

  useLayoutEffect(() => {
    viewFunction("getProject", { projectId })
      .then((res) => {
        setProject(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={project?.title}
    >
      <span className="mb-[1rem] -mt-[1rem] font-medium">
        {project?.ownerId}
      </span>
      <div className="w-[40vw] cursor-default flex flex-col gap-y-2">
        <div className="flex w-full items-center justify-between mb-[1rem]">
          <div className="flex w-[50%] gap-x-4 gap-y-2 flex-wrap">
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
            >
              <span>Web Dev</span>
            </div>
          </div>

          <div className="w-fit h-[2rem] p-2 bg-decentra-green rounded-lg flex items-center justify-center cursor-pointer">
            <span>Apply</span>
          </div>
        </div>

        <span className="font-medium">Project Payment:</span>
        <div className="flex gap-x-1 items-center">
          <span>{utils.format.formatNearAmount(project?.cost)}</span>
          <Image src={Near} alt="Near Logo" width={15} height={15} />
        </div>

        <span className="font-medium">Project Description:</span>
        <span className="block">{project?.description}</span>

        {project?.projectBrief !== "null" ? (
          <>
            <span className="font-medium">Project Brief:</span>
            <div
              className="flex items-center gap-x-2 text-decentra-green cursor-pointer"
              onClick={() => window.open(project.projectBrief, "_blank")}
            >
              <HiDocumentText className="text-[1.5rem]" />
              <span>Download</span>
            </div>
          </>
        ) : null}
      </div>
    </Modal>
  );
};

export default ProjectDetails;
