import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập từ khóa..."
            />
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button">
                <span class="fa fa-search mr-5"></span>Tìm
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
