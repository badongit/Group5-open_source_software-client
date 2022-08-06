import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

export default function InputField({ name, control, label, rules, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({ name, control, rules });

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
      error={invalid}
      helperText={error?.message}
      InputProps={inputProps}
    />
  );
}
