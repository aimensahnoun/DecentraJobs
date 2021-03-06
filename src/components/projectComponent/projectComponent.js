//React import
import { useLayoutEffect, useState } from "react";

//Component import
import ProjectDetails from "../projectDetails/projectDetails";

//Icon import
import { HiDocumentText } from "react-icons/hi";

//Utils import
import {parseDate} from "../../utils/parse-date"

const ProjectComponent = ({categories, project }) => {
  //UseStates
  const [createdDate, setDate] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [isModalOpen, setModalOpen] = useState(null);

  useLayoutEffect(() => {
   
    setDate(parseDate(project.createdOn));

    setDeadline(parseDate(project.deadline));
  }, []);

  return (
    <div
      className="w-full min-h-[6rem] shadow-decentra rounded-lg p-4 flex flex-col justify-between cursor-pointer"
      onClick={() => setModalOpen(true)}
    >
      {/* Titles */}
      <div className="w-full flex items-center">
        <span className="w-[20%]">Project Name</span>
        <span className="xl:w-[13%] 2xl:w-[20%]">Date Created</span>
        <span className="xl:w-[13%] 2xl:w-[20%]">Deadline</span>
        <span className="xl:w-[14%] 2xl:w-[10%]">Project Brief</span>
        <span className="xl:w-[40%] 2xl:w-[30%]">Category</span>
      </div>
      {/* Data */}
      <div className="w-full flex items-center">
        <span className="w-[20%] text-decentra-green font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          {project.title}
        </span>
        <span className="xl:w-[13%] 2xl:w-[20%] text-decentra-green font-medium">
          {createdDate}
        </span>
        <span className="xl:w-[13%] 2xl:w-[20%] text-decentra-green font-medium">
          {deadline}
        </span>

        <div className="xl:w-[14%] 2xl:w-[10%] text-decentra-green font-medium flex items-center gap-x-2 cursor-pointer">
          {project.projectBrief != "null" ? (
            <div
              className="flex"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.projectBrief, "_blank");
              }}
            >
              <HiDocumentText className="text-[1.5rem]" />
              <span>Download</span>
            </div>
          ) : (
            <span className="cursor-not-allowed">No Brief</span>
          )}
        </div>

        <div className="xl:w-[40%] 2xl:w-[30%] flex items-center gap-x-2 font-medium overflow-hidden">
          {project.tags?.map((category) => {
            return (
              <div
                key={category}
                className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
              >
                <span>{category}</span>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectDetails
        isModalOpen={isModalOpen}
        setIsModalOpen={setModalOpen}
        project={project}
      />
    </div>
  );
};

export default ProjectComponent;
