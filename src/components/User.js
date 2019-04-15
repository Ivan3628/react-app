import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends Component {
  state = {
    showUserInfo: true
  };
  deleteItem = (id, dispatch) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => dispatch({ type: "DELETE_CONTACT", payload: id }));
  };
  render() {
    const { id, name, email, phone, website } = this.props.user;
    const { showUserInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h3>
                {name}{" "}
                <i
                  onClick={() =>
                    this.setState({ showUserInfo: !this.state.showUserInfo })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.deleteItem.bind(this, id, dispatch)}
                />
                <Link to={`edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h3>
              {showUserInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                  <li className="list-group-item">{website}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
