import React, { Component } from "react";
import { Consumer } from "../context";
import User from "./User";

class Users extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { users } = value;
          return (
            <div>
              {users.map(user => (
                <User key={user.id} user={user} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Users;
