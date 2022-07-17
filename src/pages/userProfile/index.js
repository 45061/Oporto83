import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import ImageUploadForm from "../../components/ImageUploadForm";
import PublicModal from "../../components/PublicModal";
import { showFormAction } from "../../store/actions/modalAction";

export default function userProfile() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.authReducer);
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { showForm } = useSelector((state) => state.modalReducer);
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(showFormAction());
  };

  if (!isAuth) {
    return (
      <>
        <h1>Inicia Sesión</h1>
        <style jsx>
          {`
            h1 {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </>
    );
  }
  // console.log(isAuth);
  return (
    user && (
      <>
        <div>
          <div>
            <h3>{`Bienvenido ${user.firstName}`}</h3>
          </div>
          <div>
            <button onClick={handleClick}>Prueba</button>
            <button onClick={handleClick}>Subir Room</button>
          </div>
        </div>
        <PublicModal
          opened={showForm}
          onClose={() => dispatch(showFormAction())}
          size={largeScreen ? "50%" : "90%"}
        >
          <ImageUploadForm />
        </PublicModal>
      </>
    )
  );
}
