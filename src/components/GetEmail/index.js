import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";

import InputValidator from "../ImputValidator";

import styles from "../../styles/components/Login.module.scss";
import { hiddeRecoverPassword } from "../../store/actions/modalAction";

export default function GetEmail() {
  const [loading, setloading] = useState(false);
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    const { email } = formData;
    const response = await fetch(`${url}/api/user/recover`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch(hiddeRecoverPassword());
      setloading(false);
      toast.success("Correo enviado con exito");
    }
  };

  if (loading) {
    return (
      <>
        <div className={styles.loading}>
          <Loader color="blue" size={100} />
          <h2>Enviando correo...</h2>
        </div>
        <style jsx>
          {`
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-top: 10%;
            }
          `}
        </style>
      </>
    );
  }

  return (
    <form>
      <header className={styles.login__header}>
        <div className={styles.login__brand}>
          <img src="/oporto.png" alt="logoOporto" />
        </div>
        <h3 className={styles.login__title}> Recuperar Contraseña </h3>
      </header>
      <div className={styles.register__content}>
        <div className={styles.register1__input}>
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
      </div>
      <div className={styles.get__footer}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Enviar Correo
        </button>
      </div>
    </form>
  );
}
