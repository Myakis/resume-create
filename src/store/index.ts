import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import resume from "./resume";

export const appReducer = combineReducers({
  resume,
});

// //////////////
type AppRootReducer = typeof appReducer;
export type RootStateType = ReturnType<AppRootReducer>;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<InferValueTypes<T>>;

export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
