import React from "react";

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
        <button type="submit">New Task</button>
      </form>
    </dialog>
  );
};

export default Modal;
