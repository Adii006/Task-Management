import { calenderConstants } from "../_constants";

const initialState = [];
export const calender = (state = initialState, action) => {
  switch (action.type) {
    case calenderConstants.CALENDER_CLEAR: {
      return {
        ...initialState,
      };
    }
    case calenderConstants.CALENDER_SUCCESS: {
      const formattedState =
        !!state && state.length > 0
          ? [
              ...state,
              {
                displayDate: action.displayDate,
                displayTask: action.displayTask,
                id: action.id,
                time: action.time,
              },
            ]
          : [
              {
                displayDate: action.displayDate,
                displayTask: action.displayTask,
                id: action.id,
                time: action.time,
              },
            ];
      localStorage.setItem("task", JSON.stringify(formattedState));
      return formattedState;
    }
    case calenderConstants.UPDATE_CALENDER: {
      const formattedState =
        !!state && state.filter((eachVal) => eachVal.id !== action.primaryId);
      const updatedDetails = [
        {
          displayDate: action.displayDate,
          displayTask: action.displayTask,
          id: action.id,
          time: action.time,
        },
      ];
      localStorage.setItem(
        "task",
        JSON.stringify([...formattedState, ...updatedDetails])
      );
      return formattedState;
    }
    case calenderConstants.DELETE_CALENDER: {
      const formattedState =
        !!state && state.filter((eachVal) => eachVal.id !== action.id);
      localStorage.setItem("task", JSON.stringify([...formattedState]));
      return formattedState;
    }
    case calenderConstants.CALENDER_FAILURE: {
      return {
        error: action.error,
      };
    }
    case calenderConstants.CALENDER_GET: {
      return JSON.parse(localStorage.getItem("task"));
    }
    default:
      return state;
  }
};
