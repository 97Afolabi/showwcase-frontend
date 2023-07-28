import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 30px;
  border: 0;

  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const Button = ({ text, type, onClick }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
