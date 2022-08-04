import { EDITOR_GLOBAL, SET_IMAGE, SET_PARAMS } from "./types";

export const resumeActions = {
  globalEditor: (editor: boolean) =>
    ({
      type: EDITOR_GLOBAL,
      editor,
    } as any),
  setImage: (image: any) =>
    ({
      type: SET_IMAGE,
      image,
    } as any),
  setParams: (params: any) =>
    ({
      type: SET_PARAMS,
      params,
    } as any),
};
