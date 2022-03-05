//React import
import { useState, useLayoutEffect } from "react";

//Icons import
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";

import TailwindColor from "@videsk/tailwind-random-color";

const ActiveProjectContent = () => {
  const [colors, setColors] = useState([]);

  useLayoutEffect(() => {
    const colorsList = [];
    for (let i = 0; i < 10; i++) {
      colorsList.push(new TailwindColor().pick());
    }
    setColors(colorsList);
  }, []);

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

        <div className="h-[3rem] w-fit p-2 rounded-lg text-black flex gap-x-2 bg-decentra-green items-center cursor-pointer select-none">
          <IoMdAdd className="text-[1.5rem]" />
          <span>Create Project</span>
        </div>
      </div>

      {/* Content */}

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
            Crypto Landing Page
          </span>
          <span className="w-[20%] text-decentra-green font-medium">
            3 Jul, 2020
          </span>
          <span className="w-[20%] text-decentra-green font-medium">
            14 May, 2021
          </span>
          <div className="w-[10%] text-decentra-green font-medium flex items-center gap-x-2 cursor-pointer">
            <HiDocumentText className="text-[1.5rem]" />
            <span>Download</span>
          </div>
          <div className="w-[30%] flex items-center gap-x-2 font-medium overflow-hidden">
            <div
              className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-decentra-green text-white`}
            >
              <span>Web Dev</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectContent;
