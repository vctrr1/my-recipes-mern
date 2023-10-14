import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/"} className="title">
        <img src={logo} className="logo" />
        My Recipes
      </NavLink>
      <div>
        <div className="nav-container">
          <NavLink to={"/create-recipe"} className="nav">
            Cadastrar Nova Receita
          </NavLink>
          <NavLink to={"/saved-recipes"} className="nav">
            Minhas Receitas
          </NavLink>
          <NavLink to={"/auth"} className="nav">
            Login/Cadastro
          </NavLink>
        </div>
      </div>
    </div>
  );
};
