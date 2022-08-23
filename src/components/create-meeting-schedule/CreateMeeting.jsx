import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import InputField from "@components/form-field/InputField";
import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

// const times = [
//   { time: 1 * 24 * 60, text: "1 day" },
//   { time: 60, text: "1 hour later" },
//   { time: 15, text: "15 minutes later" },
//   { time: 1, text: "1 minute later" },
// ];

export default function CreateMeeting(props) {
  const { isCreateMeeting, setIsCreateMeeting, conversation, onCreateMeeting } =
    props;
  // const [activeBtn, setActiveBtn] = useState("");
  const defaultValues = {
    title: "",
    start: new Date(),
    description: "",
    conversationId: conversation?._id,
  };
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues,
    mode: "all",
  });

  useEffect(() => {
    setValue("conversationId", conversation?._id);
  }, [setValue, conversation]);

  const onsubmit = (data) => {
    onCreateMeeting({ ...data, start: getValues("start").toISOString() });
    setIsCreateMeeting(false);
    reset(defaultValues);
  };

  return (
    <div>
      <CustomDialog
        open={isCreateMeeting}
        title="Create a meeting schedule"
        customClassNameDialog="create-meeting"
        className="create-meeting__title"
        iconBtn={
          <div className="create-meeting__title-close">
            <IconButton onClick={() => setIsCreateMeeting(false)}>
              <Close />
            </IconButton>
          </div>
        }
        content={
          <>
            <Typography variant="body2" color="GrayText">
              Enter title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter new title or paste link"
                    multiline
                    rows={5}
                    value={field.value}
                    onChange={field.onChange}
                    error={error?.message ? true : false}
                    helperText={error?.message}
                  />
                </>
              )}
              rules={{
                required: { value: true, message: "Title is required" },
              }}
            />
            <Typography variant="body2" color="GrayText">
              Choose time
            </Typography>
            {/* <Box
              my={1}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {times.map((item, index) => (
                <Button
                  key={index}
                  className={
                    activeBtn === item.text
                      ? "custom-button-time active"
                      : "custom-button-time"
                  }
                  onClick={() => setActiveBtn(item.text)}
                >
                  {item.text}
                </Button>
              ))}
            </Box> */}
            <Controller
              name="start"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      minDate={new Date()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          margin="normal"
                          error={error?.message ? true : false}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                );
              }}
              rules={{
                required: { value: true, message: "Time is required" },
              }}
            />
            <Typography variant="body2" color="GrayText">
              Description
            </Typography>
            <InputField name="description" control={control} />
          </>
        }
        actions={
          <Box>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disabled={!isValid}
              onClick={handleSubmit(onsubmit)}
            >
              create meeting
            </Button>
            <Button
              size="small"
              variant="contained"
              color="inherit"
              sx={{ marginLeft: "10px" }}
              onClick={() => setIsCreateMeeting(false)}
            >
              cancel
            </Button>
          </Box>
        }
      />
    </div>
  );
}
