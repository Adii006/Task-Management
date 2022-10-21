import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskAction, Calender } from "../_actions";

const useStyle = makeStyles({
  textField: {
    display: "block",
    margin: "10px 0px",
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
  },
});

const AddTask = ({ id, handleClose }) => {
  const classes = useStyle();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const taskDetails = useSelector((state) => state?.calender) || [];

  useEffect(() => {
    if (!!id) {
      const filteredTaskDetails = taskDetails.filter(
        (eachVal) => eachVal.id === id
      );
      if (filteredTaskDetails.length > 0) {
        setTitle(filteredTaskDetails[0].displayTask.title);
        setDescription(filteredTaskDetails[0].displayTask.description);
        setDate(filteredTaskDetails[0].id);
        setTime(filteredTaskDetails[0].time);
      }
    }
  }, [id]);

  return (
    <Dialog
      open={true}
      onClose={() => {
        dispatch(AddTaskAction.clear());
      }}
      maxWidth={"md"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {id ? "Edit Task Details" : "Add Your Task"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label={!title && "Title"}
          variant="outlined"
          value={title}
          className={classes.textField}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label={!description && "Description"}
          variant="outlined"
          value={description}
          className={classes.textField}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          id="date"
          label={!date && "Task Date"}
          type="date"
          variant="outlined"
          value={date}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          id="time"
          label={!time && "DeadLine"}
          type="time"
          variant="outlined"
          value={
            time
              ? `${Math.floor(time / 60)}:${time - Math.floor(time / 60) * 60}`
              : ""
          }
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(e) => {
            const val = e.target.value;
            const filteredValue = val.split(":").reduce((acc, curr) => {
              return parseInt(acc) * 60 + parseInt(curr);
            });
            setTime(filteredValue);
          }}
        />
      </DialogContent>

      <Button
        color="primary"
        variant="contained"
        disabled={!title || !description || !date || !time}
        onClick={async () => {
          await dispatch(
            !!id
              ? Calender.updateTask({
                  title: title,
                  description: description,
                  date: date,
                  time: time,
                })
              : Calender.addTask({
                  title: title,
                  description: description,
                  date: date,
                  time: time,
                })
          );
          await dispatch(AddTaskAction.clear());
          await handleClose();
        }}
      >
        Submit
      </Button>
    </Dialog>
  );
};

export default AddTask;
