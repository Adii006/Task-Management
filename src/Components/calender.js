import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container } from "@material-ui/core";
import { AddTaskAction, Calender as CalenderAction } from "../_actions";
import AddTask from "./addTask";
import DisplayTaskDetails from "./displayTaskDetails";
import moment from "moment";
import _ from "lodash";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button: {
    margin: "20px 0px",
  },
  calender: {
    display: "grid",
    marginTop: "10px",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  },
  date: {
    minHeight: "115px",
    border: "1px solid",
  },
  taskContainer: {
    borderRadius: "5px",
    padding: "20px",
    margin: "10px 5px",
    backgroundColor: "#0000ff69",
    fontWeight: 500,
    cursor: "pointer",
  },
  container: {
    marginBottom: "20px",
  },
});

const Calender = () => {
  const classes = useStyles();

  const [taskId, setTaskId] = useState("");

  const dispatch = useDispatch();
  const taskData = useSelector((state) => state?.calender) || [];
  const showTaskDialog = useSelector((state) => state.addTask) || false;

  useEffect(() => {
    dispatch(CalenderAction.get());
  }, [showTaskDialog]);

  const currentDay = moment().format("D");

  const displayDaysInCalender = (date) => {
    return currentDay > date
      ? moment()
          .subtract(currentDay - date, "d")
          .format("ddd")
      : currentDay === date
      ? moment().format("ddd")
      : moment()
          .add(date - currentDay, "d")
          .format("ddd");
  };

  const displatTaskInCalender = (date) => {
    const filteredValue =
      taskData &&
      taskData.filter(
        (eachtask) => parseInt(eachtask.displayDate) === parseInt(date)
      );
    if (filteredValue.length > 0) {
      const formattedValue = filteredValue.map(
        (eachVal) => eachVal.displayTask
      );

      const verifyTaskTime = _.get(filteredValue, "[0].time") < 5;

      return (
        <div
          className={classes.taskContainer}
          onClick={() => {
            setTaskId(date);
          }}
        >
          {verifyTaskTime ? (
            <div>This task is Less than 5 mins</div>
          ) : (
            formattedValue.map((eachTask, index) => (
              <div className={classes.container}>
                <div>{`${index + 1} - ${eachTask.title}`}</div>
                <div>{eachTask.description}</div>
              </div>
            ))
          )}
        </div>
      );
    }
  };

  return (
    <Container maxWidth={"lg"}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          dispatch(AddTaskAction.open());
        }}
      >
        Add Task
      </Button>

      <div className={classes.calender}>
        {_.range(1, moment().daysInMonth() + 1).map((eachDate) => (
          <div className={classes.date}>
            <div>
              {`${eachDate} -`}
              {displayDaysInCalender(eachDate)}
            </div>
            <div>{displatTaskInCalender(eachDate)}</div>
          </div>
        ))}
      </div>
      {showTaskDialog?.open && <AddTask />}
      {!!taskId && (
        <DisplayTaskDetails id={taskId} handleClose={() => setTaskId("")} />
      )}
    </Container>
  );
};

export default Calender;
