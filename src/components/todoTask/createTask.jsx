import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import taskDetail from "./initialData.js";
import { TaskContext } from "../../context/taskContext.js";

export default class CreateTask extends React.Component {
  static contextType = TaskContext;
  state = { description: "", error: "" };

  render() {
    const { description, error } = this.state;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={this.context.addTask}>
          <Grid item xs={12}>
            <TextField
              error={error ? true : false}
              helperText={error ? error : ""}
              id="task"
              label="Task Description"
              name="description"
              value={description}
              multiline="true"
              rows="2"
              onChange={e => this.handleChange(e)}
            />
          </Grid>
        </form>
      </Grid>
    );
  }
}
