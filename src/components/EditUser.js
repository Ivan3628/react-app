import React, { Component } from "react";
import { Consumer } from "../context";
import axios from "axios";
import classnames from "classnames";

class EditUser extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: "",
    errors: {}
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

    //Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }
    if (website === "") {
      this.setState({ errors: { website: "Website is required" } });
      return;
    }

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
    const { name, email, phone, website, errors } = this.state;
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
                    <label htmlFor={name}>Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      value={name}
                      onChange={this.addToState}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor={email}>Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      value={email}
                      onChange={this.addToState}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor={phone}>Phone</label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Enter Phone"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.phone
                      })}
                      value={phone}
                      onChange={this.addToState}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor={website}>Website</label>
                    <input
                      name="website"
                      type="text"
                      placeholder="Enter Website"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.website
                      })}
                      value={website}
                      onChange={this.addToState}
                    />
                    {errors.website && (
                      <div className="invalid-feedback">{errors.website}</div>
                    )}
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
