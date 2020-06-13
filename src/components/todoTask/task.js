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
  }
  &:active {
    background: #9c27b0;
    color: white;
  }
  &.red {
    border: 1px solid red;
  }
  &.notclickablegrey {
    /* pointer-events: none !important; */
    background: transparent;
    color: black;
  }
  &.notclickablered {
    /* pointer-events: none !important; */
    background: transparent;
    color: black;
    border: 1px solid red;
  }
  & #btnpushlive {
    pointer-events: all !important;
  }
  &.currentnode {
    background: red;
  }
`;

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable index={this.props.index}>
        {(provided, snapshot) => {
          return (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              Testing
            </Container>
          );
        }}
      </Draggable>
    );
  }
}
