import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import taskDetail from "./initialData.js";
import { TaskContext } from "../../context/taskContext.js";
import styled from "styled-components";

const Container = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  width: 800px;
  display: flex;
`;
const H4 = styled.div`
  font-size: 20px;
  color: #931078;
`;
export default class UpdateTask extends React.Component {
  static contextType = TaskContext;

  render() {
    const { description, error } = this.context.state;
    return (
      <form onSubmit={e => this.context.updateTask(e)}>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <H4> Update Task </H4>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                error={this.context.state.error["description"]}
                label="Task Description"
                name="description"
                multiline={false}
                value={description}
                helperText={this.context.state.error["message"]}
                rows="1"
                fullWidth
                onChange={e => this.context.handleChange(e)}
              />
            </Grid>
          </Grid>
        </Container>
      </form>
    );
  }
}
