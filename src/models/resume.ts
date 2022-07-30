export type TAboutMe = {
  fullName: string | null;
  jobPosition: string | null;
  imgUrl: string | null;
  age: number | null;
  location: string | null;
  phone: string | null;
};

export type THardSkills = string;

export type TProject = {
  title: string | null;
  description: string | null;
  date: string[] | null;
};
