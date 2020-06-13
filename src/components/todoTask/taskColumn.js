import React from "react";
import styled from "styled-components";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background: 'white'; */
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
`;
export default class TaskColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let taskDetail = this.props.tasks;
    console.log(taskDetail);
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {taskDetail.map((task, index) => (
                <Task key={task.id.toString()} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
