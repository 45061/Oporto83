import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { getSampleData } from "../../store/actions/sampleAction";
import { showFormAction } from "../../store/actions/modalAction";
import AppLayout from "../../components/AppLayout";
import NavBar from "../../components/Navbar";
import PublicModal from "../../components/PublicModal";

import GetEmail from "../../components/GetEmail";

export default function rooms() {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const sampleListData = useSelector((state) => state.sampleData);
  const { showForm } = useSelector((state) => state.modalReducer);
  const { sample } = sampleListData;

  const handleClcik = () => {
    dispatch(showFormAction());
  };
  useEffect(() => {
    dispatch(getSampleData());
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <AppLayout>
        <h1>Estas es una habitacion</h1>
        <h3>{JSON.stringify(sample)}</h3>
        <button onClick={handleClcik}>modal</button>
      </AppLayout>
      <PublicModal
        opened={showForm}
        onClose={() => dispatch(showFormAction())}
        size={largeScreen ? "50%" : "90%"}
      >
        <GetEmail />
      </PublicModal>
    </div>
  );
}
