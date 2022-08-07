import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SignInForm from "@components/form/SignInForm";
import SignUpForm from "@components/form/SignUpForm";
import withAuth from "@components/common/withAuth";

function Login() {
  const [action, setAction] = useState("signIn");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Grid container component="main" maxWidth="md"
              className={`MuiBox-form--wrapper MuiBox-form--wrapper-${action}`}
        >
          <Grid item xs={12} sm={6} onClick={() => setAction("signIn")}>
            <Box className={{
              "MuiBox-form--container MuiBox-form--signIn": true,
              "active": action === "signIn"
            }}>
              <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                Sign in
              </Typography>

              <SignInForm />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box className={{
              "MuiBox-form--container MuiBox-form--signUp": true,
              "active": action === "signUp"
            }}>
              {
                action === "signUp"
                  ? <SignUpForm />
                  : (
                    <Box component="div">
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Welcome to login
                      </Typography>
                      <Typography variant="h6">
                        Don't have an account?
                      </Typography>

                      <Button variant="outlined" onClick={() => setAction("signUp")}>
                        Sign Up
                      </Button>
                    </Box>
                  )
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HelmetProvider>
  );
}

export default withAuth(Login);
