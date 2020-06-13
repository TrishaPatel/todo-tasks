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
  text-align: "center";
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
`;
export default class TaskColumn extends React.Component {
  render() {
    let taskDetail = this.props.tasks;
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {taskDetail.map((task, index) => (
                <Task key={task.id} index={index} task={task} />
              ))}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
