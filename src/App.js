import { forwardRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
// material
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// atoms
import alertAtom from "./recoil/atoms/alertAtom";
// pages
import MainPageRouter from "./pages";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemsPage from "./pages/FoundItemsPage";
import Reports from "./pages/Reports";
import ItemDetailsPage from "./pages/ItemDetailsPage";

// -----------------------------------------------------------------------------------

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ------------------------------------------------------------------------------------

function App() {
  const alert = useRecoilValue(alertAtom);

  return (
    <>
      <Snackbar open={alert.show} autoHideDuration={100}>
        <Alert severity={alert.variant} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<MainPageRouter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lost-items" element={<LostItemsPage />} />
        <Route path="/found-items" element={<FoundItemsPage />} />
        <Route path="/item-details/:id" element={<ItemDetailsPage />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default App;
