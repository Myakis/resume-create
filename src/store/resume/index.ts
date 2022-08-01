import { TProject } from "./../../models/resume";
import { ActionsTypes } from "..";
import { TAboutMe, THardSkills } from "../../models/resume";
import { resumeActions } from "./action";
import { EDITOR_GLOBAL, SET_IMAGE } from "./types";

const initialState = {
  editor: false as boolean,
  project: [] as TProject[],
  hardSkills: [] as THardSkills[],
  aboutMe: {
    fullName: null,
    jobPosition: null,
    imgUrl: localStorage.getItem("imageBlob"),
    age: null,
    location: null,
    phone: null,
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
      if (localStorage.getItem("imageBlob")) {
        localStorage.clear();
      }
      localStorage.setItem("imageBlob", action.image);
      return {
        ...state,
        aboutMe: {
          ...state.aboutMe,
          imgUrl: action.image,
        },
      };
    default:
      return state;
  }
}
