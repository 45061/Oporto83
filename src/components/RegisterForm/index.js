import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  showLoginForm,
  hiddeRegisterForm,
} from "../../store/actions/modalAction";
// import ButtonAction from "../ButtonAction";
import InputValidator from "../ImputValidator";

import styles from "../../styles/components/Register.module.scss";
import { register } from "../../store/actions/authAction";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numer: "",
    password: "",
    confirmPassword: "",
    typeUser: "User",
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(register(formData));
    dispatch(hiddeRegisterForm());
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          {/* <div className={styles.register__brand}> */}
          <img src="/oporto.png" alt="logoOporto" />
          {/* </div> */}
        </div>
        <p className={styles.register__title}> Crea tu cuenta en Oporto 83</p>
      </header>
      <div className={styles.register__content}>
        <InputValidator
          name="firstName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Nombres"
          onChange={onChange}
          errorMessage="Nombre no debe estar vacio"
          required
        />
        <InputValidator
          name="lastName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Apellidos"
          onChange={onChange}
          errorMessage="Apellido no debe estar vacio"
          required
        />
        <div className="register__input--span">
          <InputValidator
            name="email"
            value={formData.name}
            type="email"
            classname={styles.register__input}
            placeholder="Email"
            onChange={onChange}
            errorMessage="Debe ser email valido"
            required
          />
        </div>
        <InputValidator
          name="numer"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Numero"
          onChange={onChange}
          errorMessage="Numero no debe estar vacio"
          required
        />
        <InputValidator
          name="password"
          value={formData.name}
          type="password"
          classname={styles.register__input}
          placeholder="Contraseña"
          onChange={onChange}
          errorMessage="Minimo 8 caracteres e incluir 1 numero y 1 caracter especial"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          required
        />
        <InputValidator
          name="confirmPassword"
          value={formData.name}
          type="password"
          classname={styles.register__input}
          placeholder="Confirmar contraseña"
          onChange={onChange}
          errorMessage="NO coinciden las claves"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          required
        />
      </div>
      <div className={styles.register__footer}>
        <button
          type="button"
          className={styles.register__link}
          onClick={() => dispatch(showLoginForm())}
        >
          ¿Ya estas registrado?
        </button>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}
