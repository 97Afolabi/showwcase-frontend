import { MouseEventHandler } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #aaa;
  cursor: pointer;
  font-size: 16px;
  margin: 4px 8px;
  padding: 8px 30px;
  border: 0;

  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const BlackButton = styled(StyledButton)`
  background-color: #000;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const RedButton = styled(StyledButton)`
  background-color: #f04;
  color: #fff;

  &:hover {
    background-color: #fff;
    color: #f04;
  }
`;

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick: MouseEventHandler;
  background?: "black" | "red";
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick, background }) => {
  switch (background) {
    case "black":
      return (
        <BlackButton type={type} onClick={onClick}>
          {text}
        </BlackButton>
      );
      break;
    case "red":
      return (
        <RedButton type={type} onClick={onClick}>
          {text}
        </RedButton>
      );
      break;
    default:
      return (
        <StyledButton type={type} onClick={onClick}>
          {text}
        </StyledButton>
      );
  }
};

export default Button;
