import { TProject } from "./../../models/resume";
import { ActionsTypes } from "..";
import { TAboutMe, THardSkills } from "../../models/resume";
import { resumeActions } from "./action";
import { FETCH_STUDY_GROUP_LIST_TYPES } from "./types";

const initialState = {
  editor: false as boolean,
  project: [] as TProject[],
  hardSkills: [] as THardSkills[],
  aboutMe: {
    fullName: null,
    jobPosition: null,
    imgUrl: null,
    age: null,
    location: null,
    phone: null,
  } as TAboutMe,
};

type TInitialState = typeof initialState;

export default function fetchTestResult(
  state = initialState,
  action: ActionsTypes<typeof resumeActions>,
): TInitialState {
  switch (action.type) {
    case FETCH_STUDY_GROUP_LIST_TYPES.REQUEST:
      return {
        ...state,
        project: [],
      };

    default:
      return state;
  }
}
