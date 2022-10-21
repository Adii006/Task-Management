import { addTaskDialogConstant } from "../_constants";

const initialState = {
  open: false,
};
export const addTask = (state = initialState, action) => {
  switch (action.type) {
    case addTaskDialogConstant.TASK_CLEAR: {
      return {
        open: false,
      };
    }
    case addTaskDialogConstant.TASK_SUCCESS: {
      return {
        open: true,
      };
    }
    case addTaskDialogConstant.TASK_FAILURE: {
      return {
        error: action.error,
      };
    }
    default:
      return state;
  }
};
