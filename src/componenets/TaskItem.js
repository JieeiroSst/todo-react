import React, { Component } from "react";

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdateStatus() {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete() {
    this.props.onDelte(this.props.task.id);
  }

  onUpdate() {
    this.props.onUpdate(this.props.task.id);
  }

  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td class="text-center">
          <span
            class={
              task.status === true
                ? "label label-danger"
                : "label label-success"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td class="text-center">
          <button type="button" onClick={this.onUpdate} class="btn btn-warning">
            <span class="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button type="button" onClick={this.onDelete} class="btn btn-danger">
            <span class="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
