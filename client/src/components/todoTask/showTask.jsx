import { TaskContext } from "../../context/taskContext.js";
import TodoTask from "./listTask.jsx";
import CreateTask from "./createTask.jsx";
import UpdateTask from "./updateTask.jsx";

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
    isLoading: false,
    newRecord: true
  };
  componentDidMount() {
    this.fetchTodos();
  }
  createTaskObject = taskValue => {
    let taskId = taskValue.id.toString();
    let taskDetail = this.state.taskDetail;
    taskDetail.tasks[taskId] = taskValue;
    taskDetail.columns[
      getValueByKey(taskStatus, taskValue.status)
    ].taskIds.push(taskValue.id);
    return taskDetail;
  };
  fetchTodos() {
    fetch("/todos")
      .then(response => response.json())
      .then(todos => {
        let taskDetail;
        todos.map((value, key) => {
          taskDetail = this.createTaskObject(value);
        });
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
          let taskDetail = this.createTaskObject(response);
          this.setState({
            description: "",
            status: getKeyByValue(taskStatus, "To-Do"),
            taskDetail: taskDetail
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

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.taskDetail).length
      : 0;
  };
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
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
    try {
      var taskData = {
        todo: {
          status: getKeyByValue(taskStatus, destination.droppableId)
        },
        authenticity_token: getMetaContent("csrf-token")
      };
      fetch(`/todos/${draggableId}`, {
        method: "put",
        body: JSON.stringify(taskData),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json(); //we only get here if there is no error
        })
        .then(response => {
          this.setState({ taskDetail: newState });
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
  render() {
    const { isLoading, newRecord } = this.state;
    if (isLoading) {
      return (
        <TaskContext.Provider
          value={{
            state: this.state,
            addTask: this.addTask,
            handleChange: this.handleChange,
            onDragEnd: this.onDragEnd,
            onDragUpdate: this.onDragUpdate
          }}
        >
          {newRecord === true ? <CreateTask /> : <UpdateTask />}
          <TodoTask />
        </TaskContext.Provider>
      );
    } else {
      return <div></div>;
    }
  }
}
