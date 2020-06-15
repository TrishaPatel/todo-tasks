var taskStatus = {
  tasks: {},
  columns: {
    "To-Do": {
      id: "To-Do",
      title: "To-Do",
      taskIds: []
    },
    "In-Progress": {
      id: "In-Progress",
      title: "In-Progress",
      taskIds: []
    },
    Completed: {
      id: "Completed",
      title: "Completed",
      taskIds: []
    }
  },
  columnsort: ["To-Do", "In-Progress", "Completed"]
};
export default taskStatus;
