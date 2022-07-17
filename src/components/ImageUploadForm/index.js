/* eslint-disable react/button-has-type */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Progress } from "@mantine/core";
import ImageUploading from "react-images-uploading";

import InputValidator from "../ImputValidator";
import { postVideo } from "../../store/actions/roomAction";
import styles from "../../styles/components/ImageUploadForm.module.scss";

function ImageUploadForm() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChanged = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [formVideoData, setVideoFormData] = useState({
    roomNumer: "",
    description: "",
    price: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setVideoFormData({
      ...formVideoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      roomNumer: formVideoData.roomNumer,
      description: formVideoData.description,
      price: formVideoData.price,
      images,
    };

    dispatch(postVideo(data));
  };

  return (
    <form className={styles.image_upload_form}>
      <header className={styles.image_upload_form__header}>
        <div className={styles.image_upload_form__media}>
          <div className={styles.image_upload_form__media__container}>
            <ImageUploading
              multiple
              value={images}
              onChange={onChanged}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              acceptType={["jpg"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className={styles.upload__image_wrapper}>
                  <div className={styles.upload__image_button}>
                    <button
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>
                      Remove all images
                    </button>
                  </div>
                  <div className={styles.image_list}>
                    {imageList.map((image, index) => (
                      <div key={index} className={styles.image_item}>
                        <img
                          src={image.data_url}
                          alt="Room in Oporto"
                          width="100"
                        />
                        <div className={styles.image_item__btn_wrapper}>
                          <button onClick={() => onImageUpdate(index)}>
                            Update
                          </button>
                          <button onClick={() => onImageRemove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
      </header>
      <div className="videoform__content">
        <InputValidator
          name="roomNumer"
          id="roomNumer"
          value={formVideoData.title}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Numero de Room"
          onChange={onChange}
          errorMessage="El titulo es obligatorio "
          required
        />
        <InputValidator
          name="description"
          id="description"
          value={formVideoData.description}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Descripcion de la habitación"
          onChange={onChange}
          errorMessage="La descripcion es obligatorio "
          required
        />
        <InputValidator
          name="price"
          id="price"
          value={formVideoData.labels}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Precio"
          onChange={onChange}
        />
      </div>
      <button onClick={handleSubmit}>Enviar</button>
    </form>
  );
}

export default ImageUploadForm;
