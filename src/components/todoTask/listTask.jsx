import result from "./dragEndResult.js";
import { DragDropContext } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import Column from "./taskColumn.jsx";
import { TaskContext } from "../../context/taskContext.js";

const Container = styled.div`
  display: flex;
  width: 100%;
`;
export default class ListTask extends React.Component {
  static contextType = TaskContext;

  constructor(props) {
    super(props);
    this.state = { taskDetail: "" };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragUpdate = this.onDragUpdate.bind(this);
  }
  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.taskDetail).length
      : 0;
  };
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    console.log(destination);
    console.log(source);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.taskDetail.columns[source.droppableId];
    const finish = this.state.taskDetail.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
      const newState = {
        ...this.state.taskDetail,
        columns: {
          ...this.state.taskDetail.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState({ taskDetail: newState });
      return;
    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };
    const newState = {
      ...this.state.taskDetail,
      columns: {
        ...this.state.taskDetail.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState({ taskDetail: newState });
  };
  render() {
    const { taskDetail } = this.context.state;
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        <Container>
          {taskDetail.columnsort.map(columnId => {
            const column = taskDetail.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => taskDetail.tasks[taskId]
            );
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}
