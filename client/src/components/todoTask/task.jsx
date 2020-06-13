import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
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
  constructor(props) {
    super(props);
  }

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
            >
              {this.props.task.description}
            </Container>
          );
        }}
      </Draggable>
    );
  }
}
