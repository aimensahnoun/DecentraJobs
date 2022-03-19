//Recoil import
import { atom } from "recoil";

//Near import
import { viewFunction, wallet } from "../../near/near-setup";

export const userProfile = atom({
  key: "userProfile",
  default: null,
});

export const projectsList = atom({
  key: "projectList",
  default: [],
});

export const updateData = (setProjects, setUser) => {
  //Getting all the projects
  viewFunction("getAllProject")
    .then((res) => {
      setProjects(res);
    })
    .catch((err) => {
      console.log(err);
    });

  //Getting the user profile
  viewFunction("getProfile", { accountId: wallet.getAccountId() })
    .then((res) => {
      setUser(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
