//Near imports
import {
  context,
  Context,
  logging,
  PersistentUnorderedMap,
  u128,
  ContractPromiseBatch,
  env,
} from "near-sdk-as";

//Models import
import { Profile, Project, Proposal } from "../models/models";

// storing userProfiles
const userProfiles = new PersistentUnorderedMap<string, Profile>("uP");

//Storing projects
const projects = new PersistentUnorderedMap<u32, Project>("pr");

//returns the profile of the user if exists else returns null
export function getProfile(accountId: string): Profile | null {
  return userProfiles.get(accountId);
}

//creates a new profile for the user
export function createProfile(
  fullName: string,
  bio: string,
  avatarUrl: string,
  skills: string[],
  accountId: string
): void {
  assert(
    accountId == context.sender,
    "Only the account owner can create a profile"
  );
  const user = getProfile(accountId);
  logging.log(user);
  assert(user == null, "User already has a profile");

  userProfiles.set(accountId, new Profile(fullName, bio, avatarUrl, skills));
}

//Delete profile
export function deleteProfile(accountId: string): boolean {
  assert(accountId == context.sender, "You can only delete your profile");

  userProfiles.delete(accountId);
  return true;
}

//Project contracts

//Create project
export function createProject(
  title: string,
  description: string,
  deadline: string,
  ownerId: string,
  projectBrief: string,
  timestamp: string,
  tags: string[]
): boolean {
  assert(ownerId == Context.sender, "Only account holder can create a project");
  assert(
    Context.attachedDeposit >= u128.Zero,
    "Project has to have at least 0.1Near as payment!"
  );

  const project = new Project(
    title,
    description,
    deadline,
    Context.attachedDeposit,
    projectBrief,
    timestamp,
    tags
  );

  projects.set(project.projectId, project);

  return true;
}

//Get Project
export function getProject(projectId: u32): Project | null {
  return projects.get(projectId);
}

//View all projects
export function getAllProject(): Project[] {
  return projects.values();
}

//Delete project
export function deleteProject(projectId: u32): boolean {
  const project = projects.get(projectId);
  if (project != null) {
    assert(project != null, "Project does not exist");
    assert(
      context.sender == project.ownerId,
      "Only project owner can delete it!"
    );

    ContractPromiseBatch.create(context.sender).transfer(project.cost);
    projects.delete(projectId);

    return true;
  }
  return false;
}

//Create Proposal
export function createProposal(
  projectId: u32,
  proposalBrief: string,
  proposalTitle: string,
  proposalDescription: string
): boolean {
  const project = projects.get(projectId);

  //Checking if project exist
  assert(project != null, "Project does not exist");

  if (project == null) return false;

  if (project.proposals.length > 0) {
    project.proposals.forEach((p) => {
      //Checking if sender is already a proposal
      assert(
        p.freelancerId != context.sender,
        "You have already made a proposal"
      );
    });
  }

  const proposal = new Proposal(
    projectId,
    proposalBrief,
    proposalTitle,
    proposalDescription
  );

  project.proposals.push(proposal);

  const freelancer = userProfiles.get(context.sender);

  if (freelancer !== null) {
    freelancer.appliedProjects.push(projectId);
    userProfiles.set(context.sender, freelancer);
  }

  projects.set(project.projectId, project);

  return true;
}
