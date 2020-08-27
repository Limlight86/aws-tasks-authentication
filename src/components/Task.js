import React from "react";

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
      <button className="delete-task" onClick={props.handleDeleteClick}>
        &times;
      </button>
    </li>
  );
};

export default Task;
