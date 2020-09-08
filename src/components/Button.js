import styled from "styled-components";

const Button = styled.button`
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
  transition: background-color 0.3s;

  border-radius: ${(props) => (props.round ? "100%" : 0)};
  background-color: ${(props) => (props.primary ? "darkblue" : "deeppink")};
  box-shadow: ${(props) =>
    props.shadow && "0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5)"};
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
  padding: ${(props) =>
    props.size === "small" || props.size === "large" ? undefined : "0.5rem"};
  &:hover {
    background-color: ${(props) => props.primary && "dodgerblue"};
  }
`;

export default Button;
