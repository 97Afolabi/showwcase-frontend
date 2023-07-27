"use client";
import styled from "styled-components";

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CenterSection = styled.section`
  text-align: center;
  padding: 20px;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5em;

    label {
      font-size: 16px;
      margin-bottom: 5px;
    }

    input {
      width: 250px;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #000;
    }

    input[type="submit"] {
      background-color: #aaa;
      cursor: pointer;
      font-size: 16px;
      padding: 5px 25px;
      border-bottom: 1px solid #000;

      &:hover {
        background-color: #222;
        color: #fff;
      }
    }
  }
`;

const HomePage = () => {
  return (
    <MainContainer>
      <CenterSection>
        <p>Hi there! Welcome to your education showcase</p>
        <form>
          <p>Type your name and click &lsquo;Enter&rsquo; below to begin!</p>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <input type="submit" value="Enter" />
        </form>
      </CenterSection>
    </MainContainer>
  );
};

export default HomePage;
