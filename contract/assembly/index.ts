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
import { Profile, Project } from "../models/models";

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

  userProfiles.set(
    accountId,
    new Profile(fullName, bio, avatarUrl, skills, accountId)
  );
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
