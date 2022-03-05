//Near imports
import { context, Context, PersistentUnorderedMap } from "near-sdk-as";

//Models import
import { Profile } from "../models/models";

// storing userProfiles
const userProfiles = new PersistentUnorderedMap<string, Profile>("uP");

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
  const user = getProfile(accountId);

  assert(user !== null, "User already has a profile");

  userProfiles.set(
    accountId,
    new Profile(fullName, bio, avatarUrl, skills, accountId)
  );
}

//Delete profile
export function deleteProfile(accountId: string): boolean {
  assert(accountId === context.sender, "You can only delete your profile");

  userProfiles.delete(accountId);
  return true;
}
