import React from "react";

const Controls = (props) => {
  return (
    <section id="controls">
      <div>
        <label htmlFor="status">Status</label>
        <select
          onChange={(event) => props.setSelectedStatus(event.target.value)}
          value={props.selectedStatus}
          id="status"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Incomplete</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Search</label>
        <input
          onChange={(event) => props.setSearchTerm(event.target.value)}
          value={props.searchTerm}
          id="search"
          type="text"
          autoComplete="off"
        />
      </div>
    </section>
  );
};

export default Controls;
