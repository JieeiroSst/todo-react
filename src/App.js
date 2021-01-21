import React, { Component } from "react";
import TaskForm from "./componenets/TaskForm";
import Control from "./componenets/Control";
import TaskList from "./componenets/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskEditing: null,
      isDisplayForm: false,
    };

    this.onGenerateData = this.onGenerateData.bind(this);
    this.onToggeForm = this.onToggeForm.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
    this.onDelte = this.onDelte.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onGenerateData() {
    const tasks = [
      { id: this.generateID(), name: "chmp", status: true },
      { id: this.generateID(), name: "chmp", status: true },
    ];
    this.setState({
      tasks: tasks,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + this.s4() + "-" + this.s4();
  }

  onToggeForm() {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  }

  onCloseForm() {
    this.setState({
      isDisplayForm: false,
    });
  }

  onSubmit(name, status) {
    const task = {
      id: this.generateID(),
      name,
      status,
    };
    var { tasks } = this.state;
    tasks.push(task);
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onShowFrom() {
    this.setState({
      isDisplayForm: true,
    });
  }

  onUpdateStatus(id) {
    var { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  findIndex(id) {
    var { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDelte(id) {
    var { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  onUpdate(id) {
    var { tasks } = this.state;
    const index = this.findIndex(id);
    const taskEditing = tasks[index];
    this.setState({
      taskEditing,
    });
    this.onShowFrom();
  }

  render(h) {
    const { tasks, isDisplayForm, taskEditing } = this.state;
    const ElemTasks =
      isDisplayForm === true ? (
        <TaskForm
          onCloseForm={this.onCloseForm}
          onSubmit={this.onSubmit}
          task={taskEditing}
        />
      ) : (
        ""
      );
    return (
      <div class="container">
        <div class="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div class="row">
          <div
            class={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}
          >
            {ElemTasks}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              onClick={this.onToggeForm}
              class="btn btn-primary"
            >
              <span class="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button
              type="button"
              class="btn btn-danger ml-20"
              onClick={this.onGenerateData}
            >
              <span class="fa fa-plus mr-5"></span>Generate Data
            </button>
            <div class="row mt-15">{Control}</div>
            <div class="row mt-15">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelte={this.onDelte}
                  onUpdate={this.onUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
