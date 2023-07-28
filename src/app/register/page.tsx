"use client";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ApiRoutes } from "../../routes";
import Button from "../../components/Button";
import CenterSection from "../../components/CenterSection";
import MainContainer from "../../components/MainContainer";

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
          <Button type={"submit"} text={"Register"} onClick={() => {}}></Button>
          <Link href={"/"}>Log in</Link>
        </form>
      </CenterSection>
    </MainContainer>
  );
};

export default HomePage;
