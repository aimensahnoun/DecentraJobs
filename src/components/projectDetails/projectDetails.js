//NextJS import
import Image from "next/image";

//Components import
import Modal from "../modal/modal";

//Near import
import { wallet, utils } from "../../../near/near-setup";

//React import
import { useEffect, useState } from "react";

//Assets import
import Near from "../../../public/assets/images/near.svg";

//Icon import
import { HiDocumentText } from "react-icons/hi";

//Utils import
import { parseDate } from "../../utils/parse-date";

//Dependency import
import cryptoPrice from "crypto-price";

const ProjectDetails = ({ isModalOpen, setIsModalOpen, project }) => {
  //UseStates
  const [nearPrice, setNearPrice] = useState(null);

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

          <div
            className={`w-fit h-[2rem] p-2 rounded-lg flex items-center justify-center cursor-pointer ${
              project.ownerId !== wallet.getAccountId()
                ? "bg-decentra-green"
                : "bg-decentra-lightblue"
            } `}
          >
            <span>
              {project.ownerId === wallet.getAccountId() ? "Edit" : "Apply"}
            </span>
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
      </div>
    </Modal>
  );
};

export default ProjectDetails;
