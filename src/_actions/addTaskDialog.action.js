import { addTaskDialogConstant } from "../_constants";

export const AddTaskAction = {
  open,
  error,
  clear,
};

function open(value) {
  return { type: addTaskDialogConstant.TASK_SUCCESS, value };
}

function error(value) {
  return { type: addTaskDialogConstant.TASK_FAILURE, value };
}

function clear(value) {
  return { type: addTaskDialogConstant.TASK_CLEAR, value };
}
