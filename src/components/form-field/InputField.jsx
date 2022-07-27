import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

export default function InputField({ name, control, label, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { valid, error },
  } = useController({ name, control });

  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      size="small"
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={valid}
      helperText={error?.message}
      InputProps={inputProps}
    />
  );
}
