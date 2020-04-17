import React, { Component } from "react";
import axios from "axios";
import Task from "./Task";
import Form from "./Form";
import "./TaskList.css";

const API_URL = "http://localhost:3001/tasks";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true };
    this.toggleCompletition = this.toggleCompletition.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  componentDidMount() {
    this.getTasks();
  }
  async getTasks() {
    const res = await axios.get(API_URL);
    const tasks = res.data;
    this.setState({ tasks, loading: false });
  }
  async toggleCompletition(taskId, taskCompleted) {
    try {
      const res = await axios.patch(`${API_URL}/${taskId}`, {
        completed: !taskCompleted,
      });
      if (res.status === 200) {
        this.setState((state) => ({
          tasks: state.tasks.map((task) =>
            task._id !== taskId
              ? task
              : {
                  ...task,
                  completed: !taskCompleted,
                }
          ),
        }));
      }
    } catch (err) {
      alert(err);
    }
  }
  async deleteTask(taskId) {
    try {
      const res = await axios.delete(`${API_URL}/${taskId}`);
      if (res.status === 200) {
        this.setState((state) => ({
          tasks: state.tasks.filter((task) => task._id !== taskId),
        }));
      }
    } catch (err) {
      alert(err);
    }
  }
  async createTask(taskDescription) {
    try {
      const res = await axios.post(`${API_URL}`, {
        task: taskDescription,
      });
      if (res.status === 201) {
        const { task, completed, _id } = res.data;
        const newTask = { task, completed, _id };
        this.setState((oldState) => ({
          tasks: [...oldState.tasks, newTask],
        }));
      }
    } catch (err) {
      alert(err);
    }
  }
  render() {
    let renderTasks = this.state.tasks.map((task) => (
      <Task
        description={task.task}
        completed={task.completed}
        key={task._id}
        id={task._id}
        toggleCompletition={this.toggleCompletition}
        deleteTask={this.deleteTask}
      />
    ));
    let showSpinner = (
      <div className="Spinner">
        <i className="fas fa-spinner fa-7x"></i>
      </div>
    );
    return (
      <div className="TaskList">
        <h1 className="TaskList-title">Task Web App</h1>
        {this.state.loading ? showSpinner : renderTasks}
        <Form createTask={this.createTask} />
      </div>
    );
  }
}

export default TaskList;
