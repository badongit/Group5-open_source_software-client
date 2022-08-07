import React, {useState} from 'react';
import {Box, Typography, Alert} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useForm} from "react-hook-form";
import InputField from "@components/form-field/InputField";
import {authAuthenticatedAction, authLoadingAction, authStopLoadingAction} from "@store/auth/auth.action";
import authServices from "@services/auth.services";
import {useDispatch} from "react-redux";
import {global} from "@constants/global";
import {useNavigate} from "react-router-dom";

export default function SignUpForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, watch, handleSubmit, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            displayname: '',
            password: '',
            retype_password: ''
        }
    });
    const [signUpErrors, setSignUpErrors] = useState(null);

    const signUp = formData => {
        dispatch(authLoadingAction())
        authServices.register(formData)
            .then(result => {
                if (result.success) {
                    reset();
                    sessionStorage.setItem(global.ACCESS_TOKEN, result.data.accessToken);
                    sessionStorage.setItem(global.REFRESH_TOKEN, result.data.refreshToken);
                    dispatch(authAuthenticatedAction())
                    navigate('/');
                }
            })
            .catch(error => {
                if (!error.success) {
                    setSignUpErrors(error?.message || 'Internal server error')
                }
            })
            .finally(() => {
                dispatch(authStopLoadingAction())
            });
    }

    return (
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(signUp)}>
            <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
                Sign up
            </Typography>

            <InputField
                label="Username"
                name="username"
                control={control}
                rules={{required: {value: true, message: 'Username is required'}}}
            />
            <InputField
                label="Email"
                name="email"
                control={control}
                rules={{
                    required: {value: true, message: 'Email is required'},
                    pattern: {value: /^\S+@\S+$/i, message: 'Email is invalid'}
                }}
            />
            <InputField
                label="Display name"
                name="displayname"
                control={control}
                rules={{required: {value: true, message: 'Display name is required'}}}
            />
            <InputField
                label="Password"
                name="password"
                type="password"
                control={control}
                rules={{required: {value: true, message: 'Password is required'}}}
            />
            <InputField
                label="Retype password"
                name="retype_password"
                type="password"
                control={control}
                rules={{
                    validate: (value) => {
                        if (watch('password') !== value) {
                            return "The passwords do not match";
                        }
                    }
                }}
            />
            {signUpErrors && <Alert severity="error">{signUpErrors}</Alert>}
            <LoadingButton
                type="submit"
                fullWidth
                // variant="contained"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </LoadingButton>
        </Box>
    )
}
