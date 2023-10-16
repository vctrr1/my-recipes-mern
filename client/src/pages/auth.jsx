import { useState } from "react";
import axios from "axios";
import { Form } from "../components/form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  //nao acessa o token e sim a funcao que define o token
  const [, setCookies] = useCookies(["access_token"]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5100/auth/login", {
        userName,
        password,
      });
      //console.log(response.data);
      setCookies("access_token", response.data.token);
      //armazena a resposta da api com o id do usuario
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
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
      label="Login"
      onSubmit={onSubmit}
    />
  );
};
