import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to={"/"} className="title">
        <img src={logo} className="logo" />
        My Recipes
      </Link>
      <div>
        <div className="nav-container">
          <Link to={"/create-recipe"} className="nav">
            Cadastrar Nova Receita
          </Link>
          <Link to={"/saved-recipes"} className="nav">
            Minhas Receitas
          </Link>
          {!cookie.access_token ? (
            <Link to={"/auth"} className="nav">
              Login/Cadastro
            </Link>
          ) : (
            <button className="logoutButton" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
