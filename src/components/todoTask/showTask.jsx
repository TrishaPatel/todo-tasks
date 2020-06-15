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
    newRecord: true,
    id: ""
  };
  componentDidMount() {
    this.fetchTodos();
  }
  createTaskObject = taskValue => {
    // Creating task object to assing value
    let taskId = taskValue.id.toString();
    let taskDetail = this.state.taskDetail;
    taskDetail.tasks[taskId] = taskValue;
    let taskIdIndex = taskDetail.columns[
      getValueByKey(taskStatus, taskValue.status)
    ].taskIds.findIndex(task => task == taskValue.id);
    // In case of Delete if id is not exists removing
    // id from columns taskids array
    if (taskIdIndex == -1) {
      taskDetail.columns[
        getValueByKey(taskStatus, taskValue.status)
      ].taskIds.push(taskValue.id);
    }
    return taskDetail;
  };
  // fetch todos from rails api
  fetchTodos = () => {
    fetch("/todos")
      .then(response => response.json())
      .then(todos => {
        let taskDetail;
        todos.map((value, key) => {
          taskDetail = this.createTaskObject(value);
        });
        this.setState({ ...taskDetail, isLoading: true });
      });
  };
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
            taskDetail: taskDetail,
            error: {}
          });
        })
        .catch(error => {
          let errorState = {};
          errorState["message"] = "";
          error.text().then(errorMessage => {
            let errorList = Object.entries(JSON.parse(errorMessage));
            errorList.forEach(([key, value]) => {
              errorState[key] = true;
              if (errorState["message"] === "") {
                errorState["message"] = value[0];
              }
            });
            this.setState({ error: errorState });
          });
        });
    } catch (error) {
      // console.log(error);
    }
  };
  editTask = taskid => {
    fetch(`/todos/${taskid}`)
      .then(response => response.json())
      .then(todos => {
        this.setState({
          description: todos.description,
          id: taskid,
          newRecord: false
        });
      });
  };
  updateTask = event => {
    event.preventDefault();
    var taskData = {
      todo: {
        description: this.state.description
      },
      authenticity_token: getMetaContent("csrf-token")
    };
    fetch(`/todos/${this.state.id}`, {
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
        let taskDetail = this.createTaskObject(response);
        this.setState({
          description: "",
          status: getKeyByValue(taskStatus, "To-Do"),
          taskDetail,
          newRecord: true,
          error: {}
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
  };
  deleteTask = (taskId, event) => {
    event.stopPropagation();
    try {
      fetch(`/todos/${taskId}`, { method: "delete" })
        .then(response => {
          if (!response.ok) {
            throw response;
          } else {
            return response;
          }
        })
        .then(response => {
          // Instead of calling API again deleting task from array
          let taskDetail = this.state.taskDetail;
          let deletedTaskStatus = taskDetail.tasks[taskId].status;
          let taskIds =
            taskDetail.columns[getValueByKey(taskStatus, deletedTaskStatus)]
              .taskIds;
          let newTaskIds;
          newTaskIds = taskIds.filter(id => {
            return id != taskId;
          });
          delete taskDetail.tasks[taskId];
          taskDetail.columns[
            getValueByKey(taskStatus, deletedTaskStatus)
          ].taskIds = newTaskIds;
          this.setState({ ...taskDetail });
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
      // console.log(error);
    }
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // To move task between status
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
    newState.tasks[draggableId].status = getKeyByValue(
      taskStatus,
      destination.droppableId
    );
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
          // this.fetchTodos();
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
    } catch (error) {}
  };
  render() {
    const { isLoading, id, newRecord, error } = this.state;
    if (isLoading) {
      return (
        <TaskContext.Provider
          value={{
            state: this.state,
            addTask: this.addTask,
            handleChange: this.handleChange,
            onDragEnd: this.onDragEnd,
            editTask: this.editTask,
            updateTask: this.updateTask,
            deleteTask: this.deleteTask
          }}
        >
          {newRecord === true ? <CreateTask /> : <UpdateTask id={id} />}
          <TodoTask />
        </TaskContext.Provider>
      );
    } else {
      return <div></div>;
    }
  }
}
