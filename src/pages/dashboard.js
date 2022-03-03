//Next import
import Head from "next/head";

//React import
import { useState } from "react";

//Components import
import DecentraImage from "../components/decentraImage/decentraImage";
import NavItem from "../components/navItem/navItem";

//Icons import
import { CgBriefcase } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="w-screen h-screen flex">
      <Head>
        <title>DecentraJobs | Dashboard</title>
      </Head>

      {/* Sidebar */}
      <nav className="w-[20rem] h-full bg-[#EFF5F5] flex flex-col items-center py-[4rem] gap-y-8">
        <span className="font-medium text-decentra-green text-[1.5rem]">
          DecentraJobs
        </span>

        {/* Profile tab section */}
        <div className="w-[65%] bg-white rounded-lg h-[4rem] shadow-md flex gap-x-2 items-center justify-center cursor-pointer">
          <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-decentra-gray">
            <DecentraImage
              alt="Profile Image"
              width="100%"
              height="100%"
              className="object-cover rounded-full"
              src="https://images.pexels.com/photos/3970387/pexels-photo-3970387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-decentra-green font-medium">
              Aimen Sahnoun
            </span>
            <span className="text-[.8rem]">aimen.near</span>
          </div>
        </div>

        {/* Navigation tabs sections */}

        <div className="w-full items-center flex flex-col gap-y-2">
          <NavItem
            Icon={CgBriefcase}
            isActive={currentTab === 0}
            onClick={() => setCurrentTab(0)}
            title="Active Projects"
          />

          <NavItem
            Icon={FiUsers}
            isActive={currentTab === 1}
            onClick={() => setCurrentTab(1)}
            title="Client List"
          />
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
