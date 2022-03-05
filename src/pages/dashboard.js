//Next import
import Head from "next/head";
import { useRouter } from "next/router";

//React import
import { useState, useEffect } from "react";

//Components import
import DecentraImage from "../components/decentraImage/decentraImage";
import NavItem from "../components/navItem/navItem";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";
import ActiveProjectContent from "../components/activeProjectsContent/activeProjectsContent";

//Near import
import { viewFunction, wallet , signOut } from "../../near/near-setup";

//Icons import
import { CgBriefcase } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { BiLogOut , BiChalkboard } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";

//Recoil import
import { useRecoilState } from "recoil";
import { userProfile } from "../recoil/state";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useRecoilState(userProfile);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      return setIsLoading(false);
    }

    const nearId = wallet.getAccountId();

    if (!nearId) return router.replace("/");

    viewFunction("getProfile", { accountId: nearId }).then((result) => {
      if (!result) return router.replace("/onboarding");

      console.log(result);
      setUser(result);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
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
              src={user.avatarUrl}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-decentra-green font-medium">
              {user.fullName}
            </span>
            <span className="text-[.8rem]">{wallet.getAccountId()}</span>
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
            Icon={BiChalkboard}
            isActive={currentTab === 1}
            onClick={() => setCurrentTab(1)}
            title="My Projects"
          />
          <NavItem
            Icon={FiUsers}
            isActive={currentTab === 2}
            onClick={() => setCurrentTab(2)}
            title="Client List"
          />

          <NavItem
            Icon={BsChatFill}
            isActive={currentTab === 3}
            onClick={() => setCurrentTab(3)}
            title="Chat"
          />


        </div>

        {/* Logout section */}
        <div className="w-[60%] h-[4rem] mt-auto gap-x-6 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer" onClick={() => {
          signOut()
          router.replace("/")
        }}>
          <BiLogOut className="text-[1.5rem] text-decentra-green"/>
          <span className="text-decentra-green font-medium">Logout</span>
        </div>

      </nav>


      {/* Content */}
      <ActiveProjectContent />

    </div>
  );
};

export default Dashboard;
