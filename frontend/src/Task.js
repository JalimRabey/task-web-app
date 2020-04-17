import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.handleToggleCompletition = this.handleToggleCompletition.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }
  handleToggleCompletition() {
    this.props.toggleCompletition(this.props.id, this.props.completed);
  }
  handleDeleteTask() {
    this.props.deleteTask(this.props.id);
  }
  render() {
    let classCompleted = this.props.completed ? "Task-completed" : "";
    return (
      <div className={`Task ${classCompleted}`}>
        <p>{this.props.description}</p>
        <div className="Task-buttons">
          <button onClick={this.handleToggleCompletition}>
            <i
              className={
                !this.props.completed ? "far fa-square" : "far fa-check-square"
              }
            />
          </button>
          <button onClick={this.handleDeleteTask}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
