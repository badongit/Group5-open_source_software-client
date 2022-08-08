import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SignInForm from "@components/form/SignInForm";
import SignUpForm from "@components/form/SignUpForm";
import withAuth from "@components/common/withAuth";
import Helmet from '@components/common/Helmet';

function Login() {
  const [action, setAction] = useState("signIn");

  return (
    <Helmet title="Sign In">
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Grid container component="main" maxWidth="md"
              className={`MuiBox-form--wrapper MuiBox-form--wrapper-${action}`}
        >
          <Grid item xs={12} sm={6}>
            <Box className={{
              "MuiBox-form--container MuiBox-form--signIn": true,
              "active": action === "signIn"
            }}>
              {
                action === 'signIn'
                  ? (
                    <>
                      <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                        Sign in
                      </Typography>

                      <SignInForm />
                    </>
                  )
                  : (
                    <Box component="div" sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Box component="div">
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                          Sign In
                        </Typography>

                        <Button variant="outlined" onClick={() => setAction("signIn")}>
                          Sign In
                        </Button>
                      </Box>
                    </Box>
                  )
              }
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
    </Helmet>
  );
}

export default withAuth(Login);
