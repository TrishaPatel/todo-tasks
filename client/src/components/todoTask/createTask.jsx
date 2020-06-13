import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import taskDetail from "./initialData.js";
import { TaskContext } from "../../context/taskContext.js";

export default class CreateTask extends React.Component {
  static contextType = TaskContext;

  render() {
    const { description, error } = this.context.state;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={e => this.context.addTask(e)}>
          <Grid item xs={12}>
            <TextField
              id="task"
              label="Task Description"
              name="description"
              multiline={false}
              value={description}
              rows="1"
              onChange={e => this.context.handleChange(e)}
            />
          </Grid>
        </form>
      </Grid>
    );
  }
}
