import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    //console.log(result);
    if (!result.error) return null;

    const errors = {};
    //mapping the result of Joi validated errors array to errors object and copy onto state
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (input) => {
    //joi needs 2 params, actual field and the schema structure to match onto
    //actual field
    const obj = { [input.name]: input.value };
    //schema structure to match onto
    const schema = { [input.name]: this.schema[input.name] };
    //set validation check using joi
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // this function will return an object similar to errors object defined in state property
    //if no errors, this method will return null
    const errors = this.validate();
    this.setState({ errors: errors || {} }); // updating the state causes re-rendering, so we can render the error messages
    if (errors) return; //if errors, return immediately and do not call server

    this.doSubmit();

    // In React applications we should never work with document objects to access form elements
    // const username = document.getElementById('username').value;
    // If we really need to access a DOM element, we need to define a refernce object ----- (a)
    // this.username.current returns the actual DOM element like document.getElementById('username')
    // as a rule of thumb, minimize use of refs to situations where no other way seems to get the job done,
    // for example managing focus on an input field, working with animations or third party DOM libraries
    //const username = this.username.current.value;
  };

  //..............(b)
  handleChange = (e) => {
    //validation(error handling)
    //start here
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    //Update the state when username field value changes (clone the state and have react update the state)
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(inName, inLabel, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={inName}
        label={inLabel}
        value={data[inName]}
        onChange={this.handleChange}
        error={errors[inName]}
      />
    );
  }

  renderSelect(inName, inLabel, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={inName}
        label={inLabel}
        value={data[inName]}
        options={options}
        onChange={this.handleChange}
        error={errors[inName]}
      />
    );
  }

  // not supposed to render anything, store reusable functions only, so commenting out
  // render() {
  //     return ();
  // }
}

export default Form;
