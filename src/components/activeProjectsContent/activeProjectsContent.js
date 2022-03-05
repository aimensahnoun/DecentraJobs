//React import
import { useState } from "react";

//Icons import
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

//Component import
import ProjectComponent from "../projectComponent/projectComponent";
import Modal from "../modal/modal";

const ActiveProjectContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[calc(100%-20rem)] h-full py-[4rem] px-[2rem]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[2rem]">
        <div className="flex gap-x-16 items-center">
          <span className="text-[1.5rem] text-decentra-green">
            Active Projects
          </span>
          <div className="w-[25rem] h-[3rem] rounded-lg shadow-decentra p-2 flex items-center">
            <AiOutlineSearch className="text-[1.5rem] text-decentra-green mr-2" />
            <input
              className="outline-none w-full"
              placeholder="Tap to search for project"
            />
          </div>
        </div>

        <div className="h-[3rem] w-fit p-2 rounded-lg text-black flex gap-x-2 bg-decentra-green items-center cursor-pointer select-none" onClick={() => setIsModalOpen(true)}>
          <IoMdAdd className="text-[1.5rem]" />
          <span>Create Project</span>
        </div>
      </div>

      {/* Content */}
      <ProjectComponent
        projectName="Crypto Landing Page"
        createdDate="20 Jul, 2020"
        deadline="19 May, 2021"
        categories={["Web Dev", "Crypto"]}
      />

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Create Project"
      />
    </div>
  );
};

export default ActiveProjectContent;
