import { CancelRounded, Image, Mic, Send, TagFaces } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function SendMessage({ handleSendMessage }) {
	const defaultValues = {
		text: ""
	}

	const { control, formState: { errors }, setValue, handleSubmit, reset } = useForm({
		defaultValues,
	});

	const onsubmit = (data) => {
		handleSendMessage(data);
		reset(defaultValues);
	}

	return (
		<div className="send-message">
			<form onSubmit={handleSubmit(onsubmit)} className="send-message__form" autoComplete="off">
				<div className="send-message__form-icon">
					<Image sx={{ margin: "0 5px"}} color="primary" />
					<Mic  sx={{ margin: "0 5px"}}  color="primary" />
				</div>
				<Controller
					control={control}
					name="text"
					render={({ field }) => {
						return (
              <TextField
                {...field}
                fullWidth
								margin="normal"
								size="small"
                error={!!errors.text && !!field.value}
                helperText={!field.value ? "" : errors.text?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {field.value ? (
												<IconButton onClick={() => setValue( "text", "")}>
                          <CancelRounded color="primary" />
                        </IconButton>
                      ) : (
                        ""
                      )}
                      <IconButton>
                        <TagFaces color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            );
					}}
				/>
				<IconButton>
					<Send color="primary" fontSize="medium" />
				</IconButton>
			</form>
		</div>
	);
}
