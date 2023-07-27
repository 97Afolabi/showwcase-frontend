"use client";
import axios from "axios";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { ApiRoutes } from "../../routes";

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
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(ApiRoutes.register, {
        username,
        password,
      });

      setMessage(response.data.message);
      setErrors([]);
      router.push("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <MainContainer>
      <CenterSection>
        <p>Hi there! Welcome to your education showcase</p>

        <form onSubmit={handleSubmit}>
          {message && <p>{message}</p>}
          {errors.length > 0 && (
            <p>
              {errors.map((error, index) => (
                <small
                  key={index}
                  style={{ display: "block", color: "#f44336" }}
                >
                  {error.message}
                </small>
              ))}
            </p>
          )}
          <p>Type your name and password to register!</p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input type="submit" value="Register" />
          <Link href={"/"}>Log in</Link>
        </form>
      </CenterSection>
    </MainContainer>
  );
};

export default HomePage;
