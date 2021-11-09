import React, { useState } from "react";
import { TextField, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addGoal } from "../goals/goalsSlice";
import { useDispatch } from "react-redux";

const styles = {
  paper: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "1.5rem",
    paddingBottom: "2rem",
    boxSizing: "border-box",
    marginTop: "1rem",
    backdropFilter: " blur(10px)",
    background: "rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px 0 rgb(31 38 135 / 37%)",
    borderRadius: "10px",
  },
  h2: {
    margin: "0",
  },
};

function GoalForm({ classes }) {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGoal(goal));
    setGoal("");
  };

  return (
    <Paper className={classes.paper}>
      <h2 className={classes.h2}>What are your goals for today?</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          value={goal}
          onChange={(e) => setGoal(e.currentTarget.value)}
          label="New Goal"
          fullWidth
        />
      </form>
    </Paper>
  );
}

export default withStyles(styles)(GoalForm);
