const start = {
  draggableId: "0",
  type: "TYPE",
  reason: "DROP",
  source: {
    droppableId: "To-Do",
    index: 0
  }
};

const update = {
  ...start,
  destination: {
    droppableId: "0",
    index: 1
  }
};
const result = {
  ...update,
  reason: "DROP"
};
