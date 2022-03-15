import { context, u128, RNG, datetime } from "near-sdk-as";

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
  }
}

@nearBindgen
export class Proposal {
  projectId: u32;
  freelancerId: string;
  proposalId: u32;
  proposalBrief: string;
  proposalCost: u128;
  proposalStatus: string;
  constructor(
    projectId: u32,
    freelancerId: string,
    proposalBrief: string,
    proposalCost: u128,
    proposalStatus: string
  ) {
    this.projectId = projectId;
    this.freelancerId = freelancerId;
    this.proposalBrief = proposalBrief;
    this.proposalCost = proposalCost;
    this.proposalStatus = proposalStatus;
    this.proposalId = new RNG<u32>(1, u32.MAX_VALUE).next();
  }
}
