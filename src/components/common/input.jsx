import React, { Component } from "react";

// because we are working with a controlled component, no component level state required, so functional component
// { name, label, value, onChange } will be the interface of our input component
const Input = ({ name, label, error, ...rest }) => {
  // const test_function = ({ type, name, label, ...rest }) => {
  //   console.log("rest ", rest);
  //   const spread = { ...rest };
  //   console.log("spread ", spread);
  // };

  // test_function({ type, name, label, value, error, onChange });

  // return (
  //   <div className="form-group">
  //     <label htmlFor={name}>{label}</label>
  //     <input
  //       autoFocus
  //       name={name}
  //       type={type}
  //       value={value}
  //       onChange={onChange}
  //       id={name}
  //       className="form-control"
  //     />
  //     {error && <div className="alert alert-danger">{error}</div>}
  //   </div>
  // );

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
