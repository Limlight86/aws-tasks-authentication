import styled from "styled-components";

const Button = styled.button`
  border: 0;
  border-radius: ${(props) => (props.round ? "100%" : 0)};
  background-color: ${(props) => (props.primary ? "darkblue" : "deeppink")};
  box-shadow: ${(props) =>
    props.shadow && "0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5)"};
  color: white;
  font-size: ${(props) => (props.size === "large" ? "1.5rem" : undefined)};
  width: ${(props) =>
    props.fullWidth
      ? "100%"
      : props.size === "large"
      ? "3.5rem"
      : props.size === "small"
      ? "1.75rem"
      : undefined};
  height: ${(props) =>
    props.size === "large"
      ? "3.5rem"
      : props.size === "small"
      ? "1.75rem"
      : undefined};
  cursor: pointer;
  text-transform: uppercase;
  padding: ${(props) =>
    props.size === "small" || props.size === "large" ? undefined : "0.5rem"};

  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.primary && "dodgerblue"};
  }
`;

export default Button;
