import React from "react";
import Button from "../components/Button";

const Task = (props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={props.handleCheckboxClick}
      />
      <input
        type="text"
        defaultValue={props.description}
        onBlur={props.handleDescriptionChange}
      />
      <Button size="small" onClick={props.handleDeleteClick}>
        &times;
      </Button>
    </li>
  );
};

export default Task;
