//Components import
import Modal from "../modal/modal";

//Near import
import { viewFunction } from "../../../near/near-setup";

//React import
import { useEffect, useState } from "react";

const ProjectDetails = ({ isModalOpen, setIsModalOpen, projectId }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    viewFunction("getProject", { projectId })
      .then((res) => {
        setProject(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        
      </Modal>;
};

export default ProjectDetails;
