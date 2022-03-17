//NextJS import
import Image from "next/image";

//Components import
import Modal from "../modal/modal";

//Near import
import { wallet, utils, callFunction } from "../../../near/near-setup";

//React import
import { useEffect, useState } from "react";

//Assets import
import Near from "../../../public/assets/images/near.svg";

//Icon import
import { HiDocumentText } from "react-icons/hi";

//Utils import
import { parseDate } from "../../utils/parse-date";
import { toast } from "react-toastify";
import ApplicationForm from "../applicationForm/applicationForm";

const ProjectDetails = ({ isModalOpen, setIsModalOpen, project }) => {
  //UseStates
  const [nearPrice, setNearPrice] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  //UseEffects
  useEffect(() => {
    (async () => {
      const apiData = await fetch(
        "https://api.coingecko.com/api/v3/coins/near"
      );
      const nearData = await apiData.json();

      setNearPrice(nearData?.market_data?.current_price?.usd);
    })();
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) setIsApplying(false);
  }, [isModalOpen]);

  console.log(project);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={project?.title}
    >
      {!isApplying ? (
        <>
          <span className="mb-[1rem] -mt-[1rem] font-medium">
            {project?.ownerId}
          </span>
          <div className="w-[40vw] cursor-default flex flex-col gap-y-2">
            <div className="flex w-full items-center justify-between mb-[1rem]">
              <div className="flex w-[50%] gap-x-4 gap-y-2 flex-wrap">
                {project.tags.map((tag, index) => {
                  return (
                    <div
                      key={tag}
                      className={`w-[fit] h-[2rem] flex justify-center items-center rounded-xl p-2 bg-[#EFF5F5] `}
                    >
                      <span>{tag}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-x-2">
                <div
                  className={`w-fit h-[2rem] p-2 rounded-lg flex items-center justify-center cursor-pointer ${
                    project.ownerId !== wallet.getAccountId()
                      ? "bg-decentra-green"
                      : "bg-decentra-lightblue"
                  } `}
                  onClick={() => {
                    if (project.ownerId !== wallet.getAccountId()) {
                      setIsApplying(true);
                    }
                  }}
                >
                  <span>
                    {project.ownerId === wallet.getAccountId()
                      ? "Edit"
                      : "Apply"}
                  </span>
                </div>
                {project.ownerId === wallet.getAccountId() && (
                  <div
                    onClick={() => {
                      callFunction("deleteProject", {
                        projectId: project.projectId,
                      })
                        .then(() => {
                          setIsModalOpen(false);
                          toast.success("Project Deleted Successfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        })
                        .catch(() => {
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
                    }}
                    className={`w-fit h-[2rem] p-2 rounded-lg flex items-center justify-center cursor-pointer bg-red-600 text-white`}
                  >
                    <span>Delete</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-x-[4rem] mb-4">
              <div className="flex flex-col">
                <span className="font-medium">Project Payment:</span>
                <div className="flex gap-x-1 items-center">
                  <span>{utils.format.formatNearAmount(project?.cost)}</span>
                  <Image src={Near} alt="Near Logo" width={15} height={15} />

                  <span className="ml-2">
                    $
                    {(
                      utils.format.formatNearAmount(project?.cost) *
                      parseFloat(nearPrice)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Project Deadline:</span>
                <div className="flex gap-x-1 items-center">
                  <span>{parseDate(project?.deadline)}</span>
                </div>
              </div>
            </div>

            <span className="font-medium">Project Description:</span>
            <span className="block">{project?.description}</span>

            {project?.projectBrief !== "null" ? (
              <>
                <span className="font-medium">Project Brief:</span>
                <div
                  className="flex items-center gap-x-2 text-decentra-green cursor-pointer w-fit"
                  onClick={() => window.open(project.projectBrief, "_blank")}
                >
                  <HiDocumentText className="text-[1.5rem]" />
                  <span>Download</span>
                </div>
              </>
            ) : null}

            {project.ownerId === wallet.getAccountId() && (
              <>
                <hr className="my-4 border-decentra-lightblue border-[1px]" />
                <span className="font-medium">Proposals:</span>
                <div className="flex flex-col gap-y-2">
                  {project?.proposals.map((proposal, index) => {
                    return (
                      <div
                        key={index}
                        className="transition-all duration-300"
                        onClick={(e) => {
                          console.log(
                            e.currentTarget.children[1].classList.toggle(
                              "hidden"
                            )
                          );
                        }}
                      >
                        <div className="flex justify-between items-center cursor-pointer ">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {proposal.proposalTitle}
                            </span>
                            <span>{proposal.freelancerId}</span>
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <button className="h-[2rem] w-fit p-2 rounded-lg bg-red-600 flex justify-center items-center text-white">
                              Reject
                            </button>
                            <button className="h-[2rem] w-fit p-2 rounded-lg bg-decentra-green flex justify-center items-center ">
                              Accept
                            </button>
                          </div>
                        </div>
                        <div className="border-t-[1px] py-2 hidden">
                          <span>{proposal.proposalDescritpion}</span>
                          {proposal.proposalBrief !== "null" && (
                            <div
                              className="flex items-center gap-x-2 text-decentra-green cursor-pointer w-fit"
                              onClick={() =>
                                window.open(proposal.proposalBrief, "_blank")
                              }
                            >
                              <HiDocumentText className="text-[1.5rem]" />
                              <span>Download proposal</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>{" "}
        </>
      ) : (
        <ApplicationForm
          setIsApplying={setIsApplying}
          projectId={project.projectId}
        />
      )}
    </Modal>
  );
};

export default ProjectDetails;
