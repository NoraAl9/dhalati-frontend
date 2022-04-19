import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
// material
import { Container, TextField, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "../../recoil/atoms/alertAtom";
// __apis__
import { loginRequest } from "../../__apis__/auth";
// styles
import loginPageStyles from "./LoginPageStyles";

// -------------------------------------------------------

function LoginPage() {
  const setAlert = useRecoilState(alertAtom)[1];
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append("phone_number", values.phoneNumber);
        data.append("password", values.password);
        await loginRequest(data)
          .then(() => {
            setAlert({
              show: true,
              variant: "success",
              message: "Logged in successfully",
            });
            navigate("/home");
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setAlert({
                show: true,
                variant: "error",
                message: "Wrong phone number or password.",
              });
            }
          });
      } catch (error) {
        setAlert({
          show: true,
          variant: "error",
          message: "Something wrong happened. Please try again later.",
        });
      }
    },
  });

  const {
    values,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    dirty,
    errors,
    touched,
  } = formik;

  return (
    <Container
      sx={loginPageStyles.container}
      onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
    >
      <Grid container spacing={3} sx={loginPageStyles.formWrapper}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5" textAlign="center">
            Welcome to Dhalati admin center
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Phone number"
            value={values.phoneNumber}
            onChange={(event) =>
              setFieldValue("phoneNumber", event.target.value)
            }
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Password"
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <LoadingButton
            variant="contained"
            disabled={!dirty}
            onClick={handleSubmit}
            loading={isSubmitting}
            fullWidth
            sx={{ backgroundColor: "#2f575c" }}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
