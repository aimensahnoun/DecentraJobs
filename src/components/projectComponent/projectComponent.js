//React import
import { useLayoutEffect, useState } from "react";

//Icon import
import { HiDocumentText } from "react-icons/hi";

const ProjectComponent = ({ projectName, brief, categories, project }) => {
  //UseStates
  const [createdDate, setDate] = useState(null);
  const [deadline, setDeadline] = useState(null);

  useLayoutEffect(() => {
    var date = new Date(parseInt(project.createdOn));
    const splitDate = date.toString().split(" ");
    date = `${splitDate[2]} ${splitDate[1]}, ${splitDate[3]}`;
    setDate(date);

    var deadLineDate = new Date(project.deadline);
    const splitDeadline = deadLineDate.toString().split(" ");
    deadLineDate = `${splitDeadline[2]} ${splitDeadline[1]}, ${splitDeadline[3]}`;
    setDeadline(deadLineDate);
  }, []);

  return (
    <div className="w-full h-[6rem] shadow-decentra rounded-lg p-4 flex flex-col justify-between">
      {/* Titles */}
      <div className="w-full flex items-center">
        <span className="w-[20%]">Project Name</span>
        <span className="w-[20%]">Date Created</span>
        <span className="w-[20%]">Deadline</span>
        <span className="w-[10%]">Project Brief</span>
        <span className="w-[30%]">Category</span>
      </div>
      {/* Data */}
      <div className="w-full flex items-center">
        <span className="w-[20%] text-decentra-green font-medium">
          {project.title}
        </span>
        <span className="w-[20%] text-decentra-green font-medium">
          {createdDate}
        </span>
        <span className="w-[20%] text-decentra-green font-medium">
          {deadline}
        </span>

        <div className="w-[10%] text-decentra-green font-medium flex items-center gap-x-2 cursor-pointer">
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

        <div className="w-[30%] flex items-center gap-x-2 font-medium overflow-hidden">
          {categories?.map((category) => {
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
    </div>
  );
};

export default ProjectComponent;
