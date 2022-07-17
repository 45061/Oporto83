import React, { useState } from "react";
// import { useDispatch } from "react-redux";

import InputValidator from "../ImputValidator";

import styles from "../../styles/components/Login.module.scss";
// import { hiddeRecoverPassword } from "../store/reducers/Modals.actionCreator";

function GetEmail() {
  // const [loading, setloading] = useState(false);
  // const url = process.env.REACT_APP_BACKEND_URI;
  const [formData, setFormData] = useState({
    email: "",
  });
  // const dispatch = useDispatch();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setloading(true);
    // const { email } = formData;
    // const response = await axios.post(`${url}/user/getemail`, { email });
    // if (response.status === 201) {
    //   dispatch(hiddeRecoverPassword());
    //   toast.success("Correo enviado con exito");
    // }
  };

  // if (loading) {
  //   return (
  //     <div className="loading">
  //       <Loader color="red" size={100} />
  //       <h2>Enviando correo...</h2>
  //     </div>
  //   );
  // }

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
          handleClick={handleSubmit}
        >
          Enviar Correo
        </button>
      </div>
    </form>
  );
}

export default GetEmail;
