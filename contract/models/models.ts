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
