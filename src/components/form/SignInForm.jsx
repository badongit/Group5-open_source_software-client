import React, {useState} from 'react';
import InputField from "@components/form-field/InputField";
import {Alert, Box, Grid, Link} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckboxField from "@components/form-field/CheckboxField";
import {useForm} from "react-hook-form";
import {authLoadingAction, authStopLoadingAction} from "@store/auth/auth.action";
import authServices from "@services/auth.services";
import {global} from "@constants/global";
import {useNavigate} from "react-router-dom";
import store from "@store";

export default function SignInForm() {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
            remember: false
        }
    });
    const [loginErrors, setLoginErrors] = useState(null);

    const signIn = formData => {
        store.dispatch(authLoadingAction())
        authServices.login(formData)
            .then(result => {
                sessionStorage.setItem(global.ACCESS_TOKEN, result.data.accessToken);
                sessionStorage.setItem(global.REFRESH_TOKEN, result.data.refreshToken);
                navigate('/');
            })
            .catch(error => {
                if (!error.success) {
                    setLoginErrors(error?.message || 'Internal server error')
                }
            })
            .finally(() => {
                store.dispatch(authStopLoadingAction())
            });
    }

    return (
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(signIn)}>
            <InputField
                label="Username"
                name="username"
                control={control}
                rules={{required: {value: true, message: 'Username is required'}}}
            />
            <InputField
                label="Password"
                name="password"
                type="password"
                control={control}
                rules={{required: {value: true, message: 'Password is required'}}}
            />
            {loginErrors && <Alert severity="error">{loginErrors}</Alert>}
            <LoadingButton
                type="submit"
                fullWidth
                // variant="contained"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                loading={store.getState().auth.isLoading}
            >
                Sign In
            </LoadingButton>
            <Grid container>
                <Grid item xs>
                    <CheckboxField name="remember" label="Remember Me" control={control} />
                </Grid>
                <Grid item sx={{display: 'inline-flex', alignItems: 'center'}}>
                    <Link href="#" variant="body2">
                        Forgot password
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}
