export type TAboutMe = {
  fullName: string | null;
  jobPosition: string | null;
  imgUrl: string | null;
  age: string | null;
  location: string | null;
  phone: string | null;
  description: string | null;
};

export type THardSkills = { id?: number; name: string; title?: string };

export type TProject = {
  id?: number;
  name?: string;
  title: string | null;
  description: string | null;
  date: string[] | string;
  stack?: string;
  link?: string;
};

export type TValuesForm = {
  fullName?: string | null;
  jobPosition?: string | null;
  description?: string | null;
  file?: null;
  age?: string | null;
  location?: string | null;
  phone?: string | null;
  hardSkills?: THardSkills[];
  project?: TProject[];
};
