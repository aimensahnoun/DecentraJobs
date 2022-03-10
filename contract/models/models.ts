import { context, u128 , RNG , datetime} from "near-sdk-as";

@nearBindgen
export class Profile {
  fullName: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  constructor(
    fullName: string,
    bio: string,
    avatarUrl: string,
    skills: string[],
    walletID: string
  ) {
    this.fullName = fullName;
    this.bio = bio;
    this.avatarUrl = avatarUrl;
    this.skills = skills;
  }
}

@nearBindgen
export class Project {
  title: string;
  description: string;
  deadline: string;
  createdOn: string;
  ownerId: string;
  cost: u128;
  projectBrief: string;
  projectId : u32

  constructor(
    title: string,
    description: string,
    deadline: string,
    cost: u128,
    projectBrief: string,
    timeStamp: string
  ) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.cost = cost;
    this.projectBrief = projectBrief;
    this.createdOn = timeStamp;
    this.ownerId= context.sender;
    this.projectId = new RNG<u32>(1, u32.MAX_VALUE).next();
  }
}
