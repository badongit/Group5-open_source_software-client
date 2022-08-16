import InputField from "@components/form-field/InputField";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import authServices from "@services/auth.services";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ForgotPasswordForm() {
  const { token } = useParams();
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      retype_password: "",
    },
  });
  const [forgotSuccess, setForgotSuccess] = useState(null);
  const [resetErrors, setResetErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetPassword = (formData) => {
    setLoading(true);
    authServices
      .resetPassword({ ...formData, token })
      .then((result) => {
        setForgotSuccess(result.message);
      })
      .catch((error) => {
        if (!error.success) {
          setResetErrors(error?.message || "Internal server error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {forgotSuccess ? (
        <Alert severity="success">{forgotSuccess}</Alert>
      ) : (
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(resetPassword)}
        >
          <InputField
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
            }}
          />
          <InputField
            label="Retype password"
            name="retype_password"
            type="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
              validate: (value) =>
                value === watch("password") || "The passwords do not match",
            }}
          />
          {resetErrors && <Alert severity="error">{resetErrors}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading && (
              <CircularProgress
                color="inherit"
                size={14}
                sx={{ marginRight: "5px" }}
              />
            )}
            Reset password
          </Button>
        </Box>
      )}
    </>
  );
}
