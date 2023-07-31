"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

interface HeaderProps {
  handleOpenModal: () => void;
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 10em;
  text-align: center;
  margin: 14px auto;
`;

const Header: React.FC<HeaderProps> = ({ handleOpenModal }) => {
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("username");
    setUsername(data!);
  }, []);

  return (
    <HeaderContainer>
      <h2>Welcome to {userName}&apos;s education page</h2>
      <Button
        type={"button"}
        text={"Add new education"}
        onClick={handleOpenModal}
      ></Button>
    </HeaderContainer>
  );
};

export default Header;
