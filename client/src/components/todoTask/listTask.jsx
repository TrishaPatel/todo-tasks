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

  render() {
    const { taskDetail } = this.context.state;
    return (
      <DragDropContext
        onDragEnd={this.context.onDragEnd}
        onDragUpdate={this.context.onDragUpdate}
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
