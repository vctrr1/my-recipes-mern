import PropTypes from "prop-types";

export const Form = ({
  userName,
  setUserName,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="register-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <br />
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
//validação das props
Form.propTypes = {
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
