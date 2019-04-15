import React, { Component } from "react";
import { Consumer } from "../context";
import axios from "axios";

class EditUser extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        const user = response.data;
        this.setState({
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website
        });
      });
  }

  submitUser = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone, website } = this.state;

    const updatedUser = {
      name: name,
      email: email,
      phone: phone,
      website: website
    };

    const { id } = this.props.match.params;

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(response =>
        dispatch({ type: "UPDATE_USER", payload: response.data })
      );

    this.setState({
      name: "",
      email: "",
      phone: "",
      website: ""
    });

    this.props.history.push("/");
  };

  addToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, website } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit User</div>
              <div className="card-body">
                <form onSubmit={this.submitUser.bind(this, dispatch)}>
                  <div className="form-group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={this.addToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={this.addToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="phone"
                      type="text"
                      placeholder="Enter Phone"
                      className="form-control form-control-lg"
                      value={phone}
                      onChange={this.addToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="website"
                      type="text"
                      placeholder="Enter Website"
                      className="form-control form-control-lg"
                      value={website}
                      onChange={this.addToState}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Edit User"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditUser;
