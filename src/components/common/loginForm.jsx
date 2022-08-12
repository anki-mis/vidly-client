import React, { Component } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "./form";
import auth from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}, //lets say each property in this error object will correspond to an input field
  };

  //dependent on each form, cannot be moved to common
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  username = React.createRef(); // creates a ref object-------(a)

  // componentDidMount() {
  //   this.username.current.focus(); // when component is mounted, the cursor focus is initialized to username
  // }

  doSubmit = async () => {
    // Do not call the Submit proc, but call the server,
    // save the changes and redirect the user to a different page
    //(no idea how server call, save and redirect sequence is different from calling the submit proc)
    //console.log("Submitted");
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      //this.props.history.push("/");
      //In the video above line is replaced with window.location='/' to avoid an issue
      //The entire redirection is not working in my case(i need to hit enter at the web url each time),
      //so skipping this step/fix

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      // ref={this.username} attaches the ref object to username input field
      // value={this.state.data.username} will make sure the value of the username field is
      // always coming from the state's data object and is not free-typed. This will enforce single
      // source of truth for this field's value. This will also lead to nothing happening when we type into the
      // input field. So, we will need to define and link the a change event on username field(b).
      /*
      previous username markup:-
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              ref={this.username}
              id="username"
              name="username"
              type="text"
              value={data.username}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
       previous password markup:-
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              value={data.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
      */
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
