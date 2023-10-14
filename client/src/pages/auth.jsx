import { useState } from "react";
import axios from "axios";
import { Form } from "../components/form";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5100/auth/register", {
        userName,
        password,
      });
      alert("Conta Criada com Sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      userName={userName}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label="Criar Conta"
      onSubmit={onSubmit}
    />
  );
};

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {};

  return (
    <Form
      userName={userName}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};
