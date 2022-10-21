import moment from "moment";

const getTaskDetailsFromDate = ({ currentDate }) => {
  const dateSlot = [];

  for (let i = 0; i <= 6; i++) {
    dateSlot.push({
      id: moment(currentDate).add(i, "d").format("YYYY-MM-DD"),
      displayDate: moment(currentDate).add(i, "d").format("ddd"),
      displayTask: {
        title: "Aditya",
        description: "This is a test task",
      },
    });
  }
  return dateSlot;
};

export default getTaskDetailsFromDate;
