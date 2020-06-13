import taskDetail from "./taskStatus.js";
import dragEndresult from "./dragEndResult.js";
import { DragDropContext } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import Column from "./taskColumn.js";

const Container = styled.div`
  display: flex;
  width: 100%;
`;
export default class ListTask extends React.Component {
  state = { taskDetail: taskDetail };
  onDragUpdate = update => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(this.state.vehicle_data).length
    //   : 0;
  };
  onDragEnd = dragEndresult => {
    // const { destination, source, draggableId } = result;
    // if (!destination) {
    //   return;
    // }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // const start = this.state.vehicle_data.columns[source.droppableId];
    // const finish = this.state.vehicle_data.columns[destination.droppableId];
    // if (start === finish) {
    //   const newVehicleIds = Array.from(start.vehicleIds);
    //   newVehicleIds.splice(source.index, 1);
    //   newVehicleIds.splice(destination.index, 0, draggableId);
    //   const newColumn = {
    //     ...start,
    //     vehicleIds: newVehicleIds
    //   };
    //   const newState = {
    //     ...this.state.vehicle_data,
    //     columns: {
    //       ...this.state.vehicle_data.columns,
    //       [newColumn.id]: newColumn
    //     }
    //   };
    //   this.setState({ vehicle_data: newState });
    //   return;
    // }
    // const startVehicleIds = Array.from(start.vehicleIds);
    // startVehicleIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   vehicleIds: startVehicleIds
    // };
    // const finishVehicleIds = Array.from(finish.vehicleIds);
    // finishVehicleIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   vehicleIds: finishVehicleIds
    // };
    // const newState = {
    //   ...this.state.vehicle_data,
    //   columns: {
    //     ...this.state.vehicle_data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish
    //   }
    // };
  };
  render() {
    const { taskDetail } = this.state;
    return (
      <Container>
        {taskDetail.columnsort.map(columnId => {
          console.log(columnId);
          const column = taskDetail.columns[columnId];
          console.log(column);
          const tasks = column.taskIds.map(taskId => taskDetail.tasks[taskId]);
          console.log(column);
          return column.title;
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    );
  }
}
