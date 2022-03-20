/* eslint-disable react/no-unescaped-entities */
//React import
import { useState } from "react";

//Component import
import DecentraImage from "../decentraImage/decentraImage";
import CreatePortfolioProjectModal from "../createPortfolioProjectModal/createPortfolioProjectModal";

//Near import
import { wallet } from "../../../near/near-setup";

//Recoil import
import { useRecoilValue } from "recoil";
import { userProfile } from "../../recoil/state";

//Icons import
import { AiOutlineLink } from "react-icons/ai";

//Utils import
import { parseDate } from "../../utils/parse-date";

const ProfilePage = () => {
  //Recoil state
  const user = useRecoilValue(userProfile);

  //Use State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[calc(100%-20rem)] h-full py-[4rem] px-[2rem] overflow-y-scroll">
      <div className=" flex items-center justify-between mb-[2rem]">
        <div className="flex gap-x-4 items-center">
          <div className="w-[5rem] h-[5rem] bg-gray-100 rounded-full relative">
            <DecentraImage
              src={user.avatarUrl}
              layout="fill"
              className="rounded-full object-cover "
            />
          </div>
          <div className="flex flex-col">
            <span className="text-decentra-green font-medium text-[1.5rem]">
              {user.fullName}
            </span>
            <span className="text-[1.2rem]">{wallet.getAccountId()}</span>
          </div>
        </div>

        {/* <div className="w-fit h-[2rem] rounded-lg bg-decentra-green flex items-center justify-center p-4 cursor-pointer">
          <span className="text-[1.5rem]">Hire</span>
        </div> */}
      </div>

      <div className="flex flex-col gap-y-2">
        <span className="font-medium text-[1.2rem]">Description</span>
        <span>{user.bio}</span>
      </div>

      <hr className="my-6 border-decentra-lightblue border-[1px]" />

      <div className="flex flex-col gap-y-2">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-[1.2rem]">Portfolio</span>
          <button
            className="h-[3rem] w-fit p-2 bg-decentra-lightblue rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add A Project
          </button>
        </div>
        <span className="self-center font-medium">
          {user.portfolioProjects.length === 0 ? (
            "No protfolio Projects Added"
          ) : (
            <div className="grid gap-4 w-full h-fit grid-cols-8">
              {user.portfolioProjects.map((project, index) => {
                return (
                  <div
                    key={index}
                    className="w-[20rem] h-[30rem] rounded-lg shadow-decentra"
                  >
                    <img
                      className="rounded-tl-lg rounded-tr-lg h-[80%] w-full object-cover"
                      alt="project image"
                      src={project.imgUrl}
                    />
                    <div className="flex items-center justify-between p-4">
                      <div className="flex flex-col gap-y-4">
                        <span>{project.title}</span>
                        <span>{parseDate(project.creationDate)}</span>
                      </div>

                      <div className="w-[2rem] h-[2rem] border-[1px] rounded-full flex justify-center items-center cursor-pointer" onClick={() => window.open(project.projectUrl, "_blank")}>
                        <AiOutlineLink />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </span>
      </div>

      <hr className="my-6 border-decentra-lightblue border-[1px]" />
      <div className="flex flex-col gap-y-2">
        <span className="font-medium text-[1.2rem]">Skills</span>
        <div className="flex gap-2 flex-wrap">
          {user.skills.map((skill) => {
            return (
              <div
                key={skill}
                className="w-fit h-[2rem] rounded-lg bg-decentra-lightblue p-2 flex justify-between items-center"
              >
                <span>{skill}</span>
              </div>
            );
          })}
        </div>
      </div>

      <CreatePortfolioProjectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ProfilePage;
