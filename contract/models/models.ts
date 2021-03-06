import { context, u128, RNG, datetime } from "near-sdk-as";

@nearBindgen
export class Profile {
  fullName: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  appliedProjects: u32[] = [];
  portfolioProjects: PortfolioProject[] = [];
  constructor(
    fullName: string,
    bio: string,
    avatarUrl: string,
    skills: string[]
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
  status: string;
  workResult: string;
  cost: u128;
  projectBrief: string;
  projectId: u32;
  freelancer: string;
  tags: string[];
  proposals: Proposal[];

  constructor(
    title: string,
    description: string,
    deadline: string,
    cost: u128,
    projectBrief: string,
    timeStamp: string,
    tags: string[]
  ) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.cost = cost;
    this.projectBrief = projectBrief;
    this.createdOn = timeStamp;
    this.ownerId = context.sender;
    this.projectId = new RNG<u32>(1, u32.MAX_VALUE).next();
    this.freelancer = "";
    this.tags = tags;
    this.proposals = [];
    this.status = "OPEN";
    this.workResult = "";
  }
}

@nearBindgen
export class Proposal {
  projectId: u32;
  freelancerId: string;
  proposalId: u32;
  proposalDescritpion: string;
  proposalBrief: string;
  proposalStatus: string;
  proposalTitle: string;
  constructor(
    projectId: u32,
    proposalBrief: string,
    proposalTitle: string,
    proposalDescription: string
  ) {
    this.projectId = projectId;
    this.freelancerId = context.sender;
    this.proposalBrief = proposalBrief;
    this.proposalStatus = "SUBMITTED";
    this.proposalId = new RNG<u32>(1, u32.MAX_VALUE).next();
    this.proposalTitle = proposalTitle;
    this.proposalDescritpion = proposalDescription;
  }
}

@nearBindgen
export class PortfolioProject {
  title: string;
  description: string;
  creationDate: string;
  imgUrl: string;
  projectId: u32;
  tags: string[];
  projectUrl: string;

  constructor(
    title: string,
    description: string,
    createdOn: string,
    imgUrl: string,
    tags: string[],
    projectUrl: string
  ) {
    this.title = title;
    this.description = description;
    this.creationDate = createdOn;
    this.imgUrl = imgUrl;
    this.projectId = new RNG<u32>(1, u32.MAX_VALUE).next();
    this.tags = tags;
    this.projectUrl = projectUrl;
  }
}
