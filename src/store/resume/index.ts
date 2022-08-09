import { TProject } from "./../../models/resume";
import { ActionsTypes } from "..";
import { TAboutMe, THardSkills } from "../../models/resume";
import { resumeActions } from "./action";
import { EDITOR_GLOBAL, SET_IMAGE, SET_PARAMS } from "./types";
import { projectMock } from "../../mockData";

const dataResume = JSON.parse(localStorage.getItem("resumeData")!);

const initialState = {
  editor: false as boolean,
  project: (dataResume?.project || projectMock) as TProject[],
  hardSkills: (dataResume?.hardSkills || []) as THardSkills[],
  aboutMe: {
    fullName: dataResume?.aboutMe.fullName || 'Ваше ФИО',
    description: dataResume?.aboutMe.description || '',
    jobPosition: dataResume?.aboutMe.jobPosition || 'Разработчик',
    imgUrl: localStorage.getItem("imageBlob"),
    age: dataResume?.aboutMe.age || '',
    location: dataResume?.aboutMe.location || '',
    phone: dataResume?.aboutMe.phone || '',
  } as TAboutMe,
};

type TInitialState = typeof initialState;

export default function resumeReducer(
  state = initialState,
  action: ActionsTypes<typeof resumeActions>,
): TInitialState {
  switch (action.type) {
    case EDITOR_GLOBAL:
      return {
        ...state,
        editor: action.editor,
      };
    case SET_IMAGE:
      localStorage.setItem("imageBlob", action.image);
      return {
        ...state,
        aboutMe: {
          ...state.aboutMe,
          imgUrl: action.image,
        },
      };
    case SET_PARAMS:
      localStorage.setItem("resumeData", JSON.stringify(action.params));
      return {
        ...state,
        ...action.params,
        aboutMe: {
          ...state.aboutMe,
          ...action.params.aboutMe,
        },
      };
    default:
      return state;
  }
}
