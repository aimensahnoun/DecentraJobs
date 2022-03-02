//Near imports
import { Context, PersistentUnorderedMap } from "near-sdk-as";

//Models import
import { Profile } from "../models/models";

// storing userProfiles
const userProfiles = new PersistentUnorderedMap<string, Profile>(
  "uP"
);

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
): Profile | null {
  userProfiles.set(
    accountId,
    new Profile(fullName, bio, avatarUrl, skills, accountId)
  );
  
  
  return getProfile(accountId);
}

//Delete profile
export function deleteProfile(accountId: string): boolean {
  userProfiles.delete(accountId);
  return true
}
