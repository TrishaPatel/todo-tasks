import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { TaskContext } from "../../context/TaskContext.jsx";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  &:hover {
    background: #9c27b0;
    color: white;
    cursor: pointer;
  }
  &:active {
    background: #9c27b0;
    color: white;
  }
`;

export default class Task extends React.Component {
  static contextType = TaskContext;

  render() {
    return (
      <Draggable
        index={this.props.index}
        draggableId={this.props.task.id.toString()}
      >
        {(provided, snapshot) => {
          return (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() => this.context.editTask(this.props.task.id)}
            >
              <Grid item xs={10}>
                {this.props.task.description}
              </Grid>
              <Grid item xs={2}>
                <Button color="secondary">
                  <DeleteIcon
                    onClick={e =>
                      this.context.deleteTask(this.props.task.id, e)
                    }
                  />
                </Button>
              </Grid>
            </Container>
          );
        }}
      </Draggable>
    );
  }
}
