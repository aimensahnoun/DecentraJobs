//React import
import { useState, useEffect } from "react";

//Near import
import { viewFunction , wallet} from "../../../near/near-setup";

//Icons import
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

//Component import
import ProjectComponent from "../projectComponent/projectComponent";
import CreateProjectModal from "../createProjectModal/createProjectModal";

const MyProjectsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    viewFunction("getAllProject")
      .then((res) => {
        const myProjects = res.filter((project) => project.ownerId == wallet.getAccountId());
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
              .includes(search.toLowerCase())
              || project.ownerId.toLowerCase().includes(search.toLowerCase())
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
          <span className="text-[1.5rem] text-decentra-green">
            My Projects
          </span>
          <div className="w-[25rem] h-[3rem] rounded-lg shadow-decentra p-2 flex items-center">
            <AiOutlineSearch className="text-[1.5rem] text-decentra-green mr-2" />
            <input
              className="outline-none w-full"
              onFocus={() => {
                viewFunction("getAllProject")
                  .then((res) => {
                    setProjects(res);
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
        {projects !== null
          ? filteredProjects?.map((project) => {
              return (
                <ProjectComponent
                  key={project.projectId}
                  project={project}
                  projectName="Crypto Landing Page"
                  createdDate="20 Jul, 2020"
                  deadline="19 May, 2021"
                  categories={["Web Dev", "Crypto"]}
                />
              );
            })
          : null}
      </div>

      <CreateProjectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyProjectsContent;
