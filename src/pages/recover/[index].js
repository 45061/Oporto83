/* eslint-disable react/button-has-type */

import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import InputValidator from "../../components/ImputValidator";
import styles from "../../styles/components/RecoverPassword.module.scss";

function RecoverPassword() {
  const router = useRouter();
  const { query } = useRouter();
  const token = query.index;
  const url = process.env.REACT_APP_BACKEND_URI;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/user/recover`, {
        method: "PUT",
        body: JSON.stringify({
          email: formData.email,
          password: formData.newpassword,
          confirmPassword: formData.confirmPassword,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 201) {
        toast.error("Credenciales vencidas o correo incorrecto");
        setLoading(false);
        return;
      }
      toast.success("Contraseña cambiada con exito");
      router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error("Credenciales vencidas");
    }
  };

  if (loading) {
    return (
      <>
        <div>
          <Loader color="blue" size={100} />
          <h2>Cambiando contraseña...</h2>
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
    <div className={styles.container}>
      <form>
        <header>
          <div className={styles.form__header}>
            <img
              src="/oporto.png"
              alt="Oporto83"
              className={styles.brand__icon}
            />
          </div>
          <p className={styles.form__subtitle}> Change Password </p>
        </header>
        <div className={styles.form__content_change}>
          <InputValidator
            name="email"
            classSpan="col-span-2"
            value={formData.name}
            type="email"
            classname={styles.input__Login}
            placeholder="Email"
            onChange={onChange}
            errorMessage="Debe ser email valido"
            required
          />
          <InputValidator
            name="newpassword"
            value={formData.name}
            type="password"
            classname={styles.input__Login}
            placeholder="Password"
            onChange={onChange}
            errorMessage="Minimo 8 caracteres e incluir 1 numero y 1 caracter especial"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
            required
          />
          <InputValidator
            name="confirmPassword"
            value={formData.name}
            type="password"
            classname={styles.input__Login}
            placeholder="Confirm pasword"
            onChange={onChange}
            errorMessage="NO coinciden las claves"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
            required
          />
        </div>
        <div className="form__footer">
          <button className={styles.btn_action} onClick={handleSubmit}>
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecoverPassword;
