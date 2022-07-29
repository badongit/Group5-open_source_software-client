import React from "react";
import {Box, Grid, Typography, Button} from "@mui/material";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SignInForm from "@components/form/SignInForm";
import SignUpForm from "@components/form/SignUpForm";

export default function Login() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Grid container component="main" maxWidth="md" sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <Grid item xs={12} sm={6}>
                        <Box className="MuiBox-form--container MuiBox-form--signIn active">
                            <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
                                Sign in
                            </Typography>

                            <SignInForm />

                            <div className="MuiBox-form--background"></div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box className="MuiBox-form--container MuiBox-form--signUp">
                            <Box component="div">
                                <Typography  variant='h4' sx={{fontWeight: 'bold'}}>
                                    Welcome to login
                                </Typography>
                                <Typography variant='h6'>
                                    Don't have an account?
                                </Typography>

                                <Button variant='outlined'>
                                    Sign Up
                                </Button>
                            </Box>

                            {/*<SignUpForm />*/}

                            <div className="MuiBox-form--background"></div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </HelmetProvider>
    )
}
