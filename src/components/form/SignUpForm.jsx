import React, {useState} from 'react';
import {Box, Typography, Alert} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useForm} from "react-hook-form";
import InputField from "@components/form-field/InputField";

export default function SignUpForm() {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            email: '',
            display_name: '',
            password: '',
            retype_password: ''
        }
    });
    const [signUpErrors, setSignUpErrors] = useState(null);

    return (
        <Box component="form" sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
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
                name="display_name"
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
