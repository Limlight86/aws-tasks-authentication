import React from "react";
import Button from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

const ShowModalButton = (props) => {
  return (
    <StyledButton
      size="large"
      primary
      round
      shadow
      onClick={() => props.setIsModalOpen(true)}
    >
      +
    </StyledButton>
  );
};

export default ShowModalButton;
