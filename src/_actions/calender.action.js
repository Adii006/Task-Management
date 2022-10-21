import moment from "moment";
import { calenderConstants } from "../_constants";

export const Calender = {
  addTask,
  error,
  clearTask,
  get,
  updateTask,
  deleteTask,
};

function addTask(value) {
  const formattedTaskValues = !!value && {
    displayDate: moment(value.date).format("D"),
    displayTask: {
      title: value.title,
      description: value.description,
    },
    id: value.date,
    time: value.time,
  };
  return { type: calenderConstants.CALENDER_SUCCESS, ...formattedTaskValues };
}

function updateTask(value) {
  const formattedTaskValues = !!value && {
    displayDate: moment(value.date).format("D"),
    displayTask: {
      title: value.title,
      description: value.description,
    },
    id: value.date,
    time: value.time,
    primaryId: value.primaryId,
  };
  return {
    type: calenderConstants.UPDATE_CALENDER,
    ...formattedTaskValues,
  };
}

function deleteTask(value) {
  return {
    type: calenderConstants.DELETE_CALENDER,
    id: value,
  };
}

function error(value) {
  return { type: calenderConstants.CALENDER_FAILURE, value };
}

function clearTask(value) {
  return { type: calenderConstants.CALENDER_CLEAR, value };
}

function get(id) {
  return {
    type: calenderConstants.CALENDER_GET,
    id,
  };
}
