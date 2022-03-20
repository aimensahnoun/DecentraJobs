/* eslint-disable react/no-unescaped-entities */
//Component import
import DecentraImage from "../decentraImage/decentraImage";

//Near import
import {wallet} from "../../../near/near-setup"

//Recoil import
import { useRecoilValue } from "recoil";
import { userProfile } from "../../recoil/state";

const ProfilePage = () => {
  const user = useRecoilValue(userProfile);
  console.log(user);

  return (
    <div className="w-[calc(100%-20rem)] h-full py-[4rem] px-[2rem]">
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
        <span className="font-medium text-[1.2rem]">Portfolio</span>
        <span className="self-center font-medium">
          No protfolio Projects Added
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
    </div>
  );
};

export default ProfilePage;
