import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import employeesReducer from "./reducer/employeesReducer";

const rootReducers = combineReducers({
  employees: employeesReducer,
});

export default createStore(rootReducers, applyMiddleware(promiseMiddleware));
