/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Loader, Progress } from "@mantine/core";
import ImageUploading from "react-images-uploading";

import InputValidator from "../ImputValidator";
import { postRoom } from "../../store/actions/roomAction";
import styles from "../../styles/components/ImageUploadForm.module.scss";

function ImageUploadForm() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChanged = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const [roomData, setRoomData] = useState({
    roomNumer: "",
    price: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      roomNumer: roomData.roomNumer,
      price: roomData.price,
    };

    dispatch(postRoom(data));
  };

  return (
    <form className={styles.image_upload_form}>
      <header className={styles.image_upload_form__header}></header>
      <div className="videoform__content">
        <InputValidator
          name="roomNumer"
          id="roomNumer"
          value={roomData.title}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Numero de Room"
          onChange={onChange}
          errorMessage="El titulo es obligatorio "
          required
        />
        <InputValidator
          name="price"
          id="price"
          value={roomData.price}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Precio"
          onChange={onChange}
        />
      </div>
      <div className={styles.button}>
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </form>
  );
}

export default ImageUploadForm;
