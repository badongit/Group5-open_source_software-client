import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import InputField from "@components/form-field/InputField";
import {Alert, Box, Grid, Link, CircularProgress, Button} from "@mui/material";
import CheckboxField from "@components/form-field/CheckboxField";
import {useForm} from "react-hook-form";
import {authAuthenticatedAction, authLoadingAction, authStopLoadingAction} from "@store/auth/auth.action";
import authServices from "@services/auth.services";
import {global} from "@constants/global";
import {useNavigate} from "react-router-dom";

export default function SignInForm({action}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
            remember: false
        }
    });
    const [loginErrors, setLoginErrors] = useState(null);

    const authState = useSelector(state => state.auth);

    const signIn = formData => {
        dispatch(authLoadingAction())
        authServices.login(formData)
            .then(result => {
                sessionStorage.setItem(global.ACCESS_TOKEN, result.data.accessToken);
                sessionStorage.setItem(global.REFRESH_TOKEN, result.data.refreshToken);
                dispatch(authAuthenticatedAction())
                navigate('/');
            })
            .catch(error => {
                if (!error.success) {
                    setLoginErrors(error?.message || 'Internal server error')
                }
            })
            .finally(() => {
                dispatch(authStopLoadingAction())
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
            <Button
                type="submit"
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2 }}
            >
                {authState.isLoading && <CircularProgress color="inherit" size={14} sx={{marginRight: '5px'}} />}
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <CheckboxField name="remember" label="Remember Me" control={control} />
                </Grid>
                <Grid item sx={{display: 'inline-flex', alignItems: 'center'}}>
                    <Link href="/auth/forgot-password" variant="body2">
                        Forgot password
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}
