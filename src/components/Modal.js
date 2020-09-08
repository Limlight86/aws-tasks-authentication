import React from "react";
import Button from "./Button";

const Modal = (props) => {
  return (
    <dialog open={props.isModalOpen} onClick={props.handleModalClick}>
      <form onSubmit={props.handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            autoComplete="off"
            value={props.taskDescription}
            onChange={(event) => props.setTaskDescription(event.target.value)}
            required
          />
        </div>
        <Button 
          fullWidth
          shadow
          type="submit"
        >New Task</Button>
      </form>
    </dialog>
  );
};

export default Modal;
