import { combineReducers } from "redux";
import { calender } from "./calender.reducer";
import { addTask } from "./addTask.reducer";

const rootReducer = combineReducers({
  calender,
  addTask,
});

export default rootReducer;
