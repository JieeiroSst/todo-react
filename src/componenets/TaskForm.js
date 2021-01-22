import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      status: false,
    };

    this.onCloseForm = this.onCloseForm.bind(this);
    this.onChangle = this.onChangle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    } else {
    }
  }

  onCloseForm() {
    this.props.onCloseForm();
  }

  onChangle(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.state.name,
      this.state.status === "true" ? true : false
    );
    this.onClear();
    this.onCloseForm();
  }

  onClear() {
    this.setState({
      name: "",
      status: false,
    });
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <div class="panel panel-warning">
          <div class="panel-heading">
            <h3 class="panel-title">
              {id !== "" ? "Cập nhập công việc" : "Thêm công việc"}
              <span
                className="fa fa-times-cricle text-right"
                onClick={this.onCloseForm}
              ></span>
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  value={this.state.name}
                  onChange={this.onChangle}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                class="form-control"
                required="required"
                name="status"
                value={this.state.status}
                onChange={this.onChangle}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div class="text-center">
                <button type="submit" class="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button
                  type="button"
                  onClick={this.onClear}
                  class="btn btn-danger"
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
