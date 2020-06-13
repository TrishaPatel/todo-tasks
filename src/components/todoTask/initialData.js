var taskStatus = {
  tasks: {
    "1": {
      id: "1",
      description: "Testing Application",
      status: 0
    },
    "2": {
      id: "2",
      description: "Testing Application Data",
      status: 0
    }
  },
  columns: {
    "To-Do": {
      id: "To-Do",
      title: "To-Do",
      taskIds: ["1", "2"]
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
