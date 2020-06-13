import { TaskContext } from "../../context/taskContext.js";
import TodoTask from "./listTask.jsx";
import CreateTask from "./createTask.jsx";
import React from "react";
import taskDetail from "./initialData.js";

export default class ShowTask extends React.Component {
  state = { taskDetail: taskDetail, description: "", id: 1 };
  addTask = event => {
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <TaskContext.Provider
        value={{ state: this.state }}
        addTask={this.addTask}
        handleChange={this.handleChange}
      >
        <CreateTask />
        <TodoTask />
      </TaskContext.Provider>
    );
  }
}
