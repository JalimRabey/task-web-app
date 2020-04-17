import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { taskInput: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.taskInput !== "") {
      this.props.createTask(this.state.taskInput);
    }
    this.setState({ taskInput: "" });
  }
  render() {
    return (
      <form
        className="Form-container"
        action="submit"
        onSubmit={this.handleSubmit}
      >
        <input
          name="taskInput"
          type="text"
          placeholder="task"
          onChange={this.handleChange}
        />
        <button disabled={this.state.taskInput === ""}>Create</button>
      </form>
    );
  }
}

export default Form;
