import { EDITOR_GLOBAL, SET_IMAGE } from "./types";

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
};
