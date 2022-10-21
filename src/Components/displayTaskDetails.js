import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions, makeStyles, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { Calender, AddTaskAction } from "../_actions";
import AddTask from "./addTask";

const useStyle = makeStyles({
  list: {
    marginBottom: "20px",
  },
});

const DisplayTaskDetails = ({ id, handleClose }) => {
  const classes = useStyle();
  const [editable, setEditable] = useState("");

  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.calender);
  const showTaskDialog = useSelector((state) => state.addTask) || false;

  const filteredTaskDetails =
    !!taskData &&
    taskData.filter(
      (eachTask) => parseInt(eachTask.displayDate) === parseInt(id)
    );

  const ListItemLink = (props) => {
    return <ListItem button {...props} />;
  };

  useEffect(() => {
    dispatch(Calender.get());
  }, []);

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Your Tasks</DialogTitle>
        <DialogContent>
          {filteredTaskDetails.map((val) => (
            <>
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                className={classes.list}
              >
                <ListItem button>
                  <ListItemText primary={`Title : ${val.displayTask.title}`} />
                </ListItem>
                <ListItemLink href="#simple-list">
                  <ListItemText
                    primary={`Description: ${val.displayTask.description}`}
                  />
                </ListItemLink>
                <ListItemLink href="#simple-list">
                  <ListItemText primary={`Date: ${val.id}`} />
                </ListItemLink>
              </List>
              <DialogActions>
                <Button
                  onClick={() => {
                    setEditable(val.id);
                    dispatch(AddTaskAction.open());
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    dispatch(Calender.deleteTask(val.id));
                    handleClose();
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </>
          ))}
        </DialogContent>
      </Dialog>
      {!!showTaskDialog && showTaskDialog.open && !!editable && (
        <AddTask id={editable} handleClose={() => handleClose()} />
      )}
    </>
  );
};

export default DisplayTaskDetails;
