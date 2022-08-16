import React, {useState} from 'react';
import InputField from "@components/form-field/InputField";
import {Alert, Box, CircularProgress, Button} from "@mui/material";
import {useForm} from "react-hook-form";
import authServices from "@services/auth.services";

export default function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    }
  });
  const [forgotErrors, setForgotErrors] = useState(null);
  const [forgotSuccess, setForgotSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetPassword = formData => {
    setLoading(true);
    authServices.forgotPassword(formData)
      .then(result => {
        setForgotSuccess(result.message)
      })
      .catch(error => {
        if (!error.success) {
          setForgotErrors(error?.message || 'Internal server error')
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {
        forgotSuccess
          ? <Alert severity="success">{forgotSuccess}</Alert>
          : (
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(resetPassword)}>
              <InputField
                label="Email"
                name="email"
                control={control}
                rules={{
                  required: {value: true, message: 'Email is required'},
                  pattern: {value: /^\S+@\S+$/i, message: 'Email is invalid'}
                }}
              />
              {forgotErrors && <Alert severity="error">{forgotErrors}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2 }}
              >
                {loading && <CircularProgress color="inherit" size={14} sx={{marginRight: '5px'}} />}
                Reset password
              </Button>
            </Box>
          )
      }
    </>
  )
}
