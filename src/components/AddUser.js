import React, { Component } from "react";
import { Consumer } from "../context";
import axios from "axios";
import classnames from "classnames";

class AddUser extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: "",
    errors: {}
  };
  addToState = e => this.setState({ [e.target.name]: e.target.value });

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

    const newUser = {
      name: name,
      email: email,
      phone: phone,
      website: website
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(response => dispatch({ type: "ADD_USER", payload: response.data }));

    this.setState({
      name: "",
      email: "",
      phone: "",
      website: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, website, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add User</div>
              <div className="card-body">
                <form onSubmit={this.submitUser.bind(this, dispatch)}>
                  <div className="form-group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": error
                      })}
                      value={name}
                      onChange={this.addToState}
                      error={errors.name}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": error
                      })}
                      value={email}
                      onChange={this.addToState}
                      error={errors.email}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      name="phone"
                      type="text"
                      placeholder="Enter Phone"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": error
                      })}
                      value={phone}
                      onChange={this.addToState}
                      error={errors.phone}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      name="website"
                      type="text"
                      placeholder="Enter Website"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": error
                      })}
                      value={website}
                      onChange={this.addToState}
                      error={errors.website}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <input
                    type="submit"
                    value="Add User"
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

export default AddUser;
