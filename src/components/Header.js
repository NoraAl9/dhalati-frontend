import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// material
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Container,
  Tooltip,
  Avatar,
  Link,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoadingButton } from "@mui/lab";
// __apis__
import { logoutRequest } from "../__apis__/auth";

// --------------------------------------------------

function Header() {
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertAtom);
  const [loggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutRequest()
      .then(() => {
        navigate("/login");
        setAlert({
          show: true,
          message: "Logged out successfully",
          variant: "success",
        });
      })
      .catch(() =>
        setAlert({
          show: true,
          message: "Something wrong happened while logging out.",
          variant: "error",
        })
      );
    setIsLoggingOut(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2f575c" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            p: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Dhalati</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Box sx={{ p: 1 }}>
              <Link
                variant="body1"
                color="inherit"
                onClick={() => navigate("/home")}
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Home
              </Link>
            </Box>
            <Box sx={{ p: 1 }}>
              <Link
                variant="body1"
                color="inherit"
                onClick={() => navigate("/lost-items")}
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Lost Items
              </Link>
            </Box>
            <Box sx={{ p: 1 }}>
              <Link
                color="inherit"
                variant="body1"
                underline="hover"
                onClick={() => navigate("/found-items")}
                sx={{ cursor: "pointer" }}
              >
                Found Items
              </Link>
            </Box>
            <Box sx={{ p: 1 }}>
              <Link
                color="inherit"
                variant="body1"
                underline="hover"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/reports")}
              >
                Reports
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ marginLeft: "auto", marginRight: 2 }}>
              <Avatar />
            </IconButton>
            <Tooltip title="Logout">
              <LoadingButton
                startIcon={<LogoutIcon color="inherit" />}
                color="inherit"
                loading={loggingOut}
                onClick={handleLogout}
              />
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
