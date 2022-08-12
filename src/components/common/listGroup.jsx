import React, { Component } from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        // instead of using . notation to access item object properties with their names directly(item._id)
        // [] notation can be used to access the property name dynamically(item[valueProperty])
        //with this bracket notation, this listGroup component is no longer coupled to genres and can be reused.
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
