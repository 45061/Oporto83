import React, { useState } from "react";
import { useDispatch } from "react-redux";

import InputValidator from "../ImputValidator";
import styles from "../../styles/components/Login.module.scss";

import {
  showRecoverPassword,
  showRegisterForm,
} from "../../store/actions/modalAction";
import { login } from "../../store/actions/authAction";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      login({
        email: loginData.email,
        password: loginData.password,
      })
    );
  };

  return (
    <form className={styles.login}>
      <header className={styles.login__header}>
        <div className={styles.login__brand}>
          <img src="/oporto.png" alt="logoOporto" />
        </div>

        <h3 className={styles.login__title}> Iniciar Sesión </h3>
      </header>
      <div className={styles.login__content}>
        {/* Email */}
        <InputValidator
          name="email"
          type="email"
          value={loginData.name}
          onChange={onChange}
          classname={styles.login__input}
          placeholder="email"
          errorMessage="EL correo es requerido."
          required
        />

        {/* Password */}
        <InputValidator
          name="password"
          type="password"
          value={loginData.name}
          onChange={onChange}
          classname={styles.login__input}
          placeholder="Contraseña"
          errorMessage="Minimo 8 caracteres e incluir 1 numero y 1 caracter especial"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          required
        />

        {/* Recover */}
        <button
          type="button"
          className={styles.login__link}
          onClick={() => dispatch(showRecoverPassword())}
        >
          ¿Olvidaste la contraseña?
        </button>
      </div>
      <div className={styles.login__footer}>
        <button
          type="button"
          className={styles.login__link}
          onClick={() => dispatch(showRegisterForm())}
        >
          Registrarse
        </button>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Acceder
        </button>
      </div>
    </form>
  );
}

export default Login;
