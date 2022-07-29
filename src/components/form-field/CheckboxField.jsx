import React from "react";
import { useController } from "react-hook-form";
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from "@mui/material";

export default function CheckboxField({ name, control, label, rules, ...inputProps }) {
    const {
        field: { value, onChange, ref },
        fieldState: { invalid, error },
    } = useController({ name, control, rules });

    return (
        <FormControl error={invalid} component="fieldset" variant="standard">
            <FormControlLabel
                control={<Checkbox name={name} checked={value} onChange={onChange} inputRef={ref} inputProps={inputProps} />}
                label={label}
            />
            {invalid && <FormHelperText error={invalid}>{error?.message}</FormHelperText>}
        </FormControl>
    );
}
