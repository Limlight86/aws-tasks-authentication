import React from "react";

const ShowModalButton = (props) =>{
  return(
  <button id="show-form" 
  onClick={() => props.setIsModalOpen(true)}>
  +
</button>

  )
};

export default ShowModalButton;