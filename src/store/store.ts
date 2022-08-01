import { createStore, applyMiddleware, compose } from "redux";
import { appReducer } from "./index";

//Для работоспособности расширения redux devtools
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, composeEnhancers(applyMiddleware()));

export default store;
