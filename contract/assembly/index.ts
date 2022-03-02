//Near imports
import { Context, PersistentUnorderedMap } from "near-sdk-as";

//Models import
import { Profile } from "../models/models";

// storing userProfiles
const userProfiles = new PersistentUnorderedMap<string, Profile>(
  "userProfiles"
);

//returns the profile of the user if existts else returns null
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
  userProfiles.set(
    accountId,
    new Profile(fullName, bio, avatarUrl, skills, accountId)
  );
}

//Returns static string
export function helloWorld(): string {
  return `Hello World`;
}

//Returns hello with username
export function helloYou(): string {
  return `Hello ${Context.sender}`;
}
