import { TaskContext } from "../../context/taskContext.js";
import TodoTask from "./listTask.jsx";
import CreateTask from "./createTask.jsx";
import React from "react";
import taskDetail from "./initialData.js";
import { getKeyByValue } from "../../utils/getKeyByValue.js";
import { getValueByKey } from "../../utils/getValueByKey.js";
import { taskStatus } from "../../utils/constant.js";
import { getMetaContent } from "../../utils/metacontent.js";

export default class ShowTask extends React.Component {
  state = {
    taskDetail: taskDetail,
    description: "",
    status: getKeyByValue(taskStatus, "To-Do"),
    error: {},
    isLoading: false
  };
  componentDidMount() {
    this.fetchTodos();
  }
  fetchTodos() {
    fetch("/todos")
      .then(response => response.json())
      .then(todos => {
        todos.map((value, key) => {
          let taskId = value.id.toString();
          taskDetail.tasks[taskId] = value;
          taskDetail.columns[
            getValueByKey(taskStatus, value.status)
          ].taskIds.push(value.id);
        });
        console.log(taskDetail);
        this.setState({ taskDetail: taskDetail, isLoading: true });
      });
  }
  addTask = event => {
    event.preventDefault();
    try {
      var taskData = {
        todo: {
          description: this.state.description,
          status: this.state.status
        },
        authenticity_token: getMetaContent("csrf-token")
      };
      fetch("/todos", {
        method: "post",
        body: JSON.stringify(taskData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json(); //we only get here if there is no error
        })
        .then(response => {
          this.setState({
            description: "",
            status: getKeyByValue(taskStatus, "To-Do")
          });
        })
        .catch(error => {
          let errorState = {};
          errorState["message"] = "";
          error.text().then(errorMessage => {
            let errorList = Object.entries(JSON.parse(errorMessage));
            errorList.forEach(([key, value]) => {
              errorState[key] = true;
              if (errorState["message"] == "") {
                errorState["message"] = value[0];
              }
            });
            this.setState({ error: errorState });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <TaskContext.Provider
          value={{
            state: this.state,
            addTask: this.addTask,
            handleChange: this.handleChange
          }}
        >
          <CreateTask />
          <TodoTask />
        </TaskContext.Provider>
      );
    } else {
      return <div></div>;
    }
  }
}
