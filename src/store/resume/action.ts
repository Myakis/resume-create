import { FETCH_STUDY_GROUP_LIST_TYPES } from "./types";

export const resumeActions = {
  fetchStudyGroupList: () => ({
    type: FETCH_STUDY_GROUP_LIST_TYPES.REQUEST,
  }),
};
