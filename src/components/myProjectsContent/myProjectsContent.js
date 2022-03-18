/* eslint-disable @next/next/no-img-element */
//React import
import { useState, useEffect } from "react";

//Near import
import { viewFunction, wallet } from "../../../near/near-setup";

//Icons import
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

//Assets import
import NoProject from "../../../public/assets/images/noProject.svg";
//Component import
import ProjectComponent from "../projectComponent/projectComponent";
import CreateProjectModal from "../createProjectModal/createProjectModal";
import DecentraImage from "../decentraImage/decentraImage";

const MyProjectsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);


  console.log("image" , NoProject)

  useEffect(() => {
    viewFunction("getAllProject")
      .then((res) => {
        const myProjects = res.filter(
          (project) => project.ownerId == wallet.getAccountId()
        );
        setProjects(myProjects);
        setFilteredProjects(myProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search === "") return setFilteredProjects(projects);
    if (projects) {
      setFilteredProjects(
        projects.filter((project) => {
          return (
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            project.tags
              ?.map((tag) => tag.toLowerCase())
              .includes(search.toLowerCase()) ||
            project.ownerId.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  }, [search]);

  console.log(filteredProjects);

  return (
    <div className="w-[calc(100%-20rem)] h-full py-[4rem] px-[2rem]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[2rem]">
        <div className="flex gap-x-16 items-center">
          <span className="text-[1.5rem] text-decentra-green">My Projects</span>
          <div className="w-[25rem] h-[3rem] rounded-lg shadow-decentra p-2 flex items-center">
            <AiOutlineSearch className="text-[1.5rem] text-decentra-green mr-2" />
            <input
              className="outline-none w-full"
              onFocus={() => {
                viewFunction("getAllProject")
                  .then((res) => {
                    const myProjects = res.filter(
                      (project) => project.ownerId == wallet.getAccountId()
                    );
                    setProjects(myProjects);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tap to search for project"
            />
          </div>
        </div>

        <div
          className="h-[3rem] w-fit p-2 rounded-lg text-black flex gap-x-2 bg-decentra-green items-center cursor-pointer select-none"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <IoMdAdd className="text-[1.5rem]" />
          <span>Create Project</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-4">
        {projects !== null && projects.length > 0 ? (
          filteredProjects?.map((project) => {
            return (
              <ProjectComponent key={project.projectId} project={project} />
            );
          })
        ) : (
          <div className="w-full h-[calc(100vh-20rem)] items-center justify-center flex flex-col">
            <img src="/assets/images/noProject.svg" alt="noProject"  className="w-[25rem] h-[25rem]"/>
            <span>You do not have any projects</span>
          </div>
        )}
      </div>

      <CreateProjectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyProjectsContent;
