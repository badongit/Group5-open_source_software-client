import { CancelRounded, Image, Mic, Send, TagFaces } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import ListUploadCard from "@components/list-upload-card/ListUploadCard";

export default function SendMessage({ handleSendMessage }) {
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [files, setFiles] = useState([]);

  const defaultValues = {
    text: "",
  };

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });

  const onEmojiClick = (event, emojiObject) => {
    setValue("text", getValues("text") + emojiObject.emoji);
  };

  const onsubmit = (data) => {
    handleSendMessage(data);
    files.forEach((file) => handleSendMessage({ file }));
    setFiles([]);
    reset(defaultValues);
  };

  const handleChangeFilesInput = (event) => {
    const newFiles = Array.from(event.target.files);

    for (let key in newFiles) {
      if (newFiles[key].size > +process.env.REACT_APP_MAX_SIZE_FILE) {
        toast.error(
          "The file you selected is too large. Maximum size is 20MB."
        );
        return;
      }
      newFiles[key].subId = uuid();
    }

    setFiles((preFiles) => preFiles.concat(newFiles));
  };

  const handleRemoveFilesMessage = (subId) => {
    setFiles((preFiles) => preFiles.filter((file) => file.subId !== subId));
  };

  return (
    <div className="send-message">
      <input
        type="file"
        name="files"
        id="files"
        hidden={true}
        multiple
        onChange={handleChangeFilesInput}
      />
      {!!files.length && (
        <ListUploadCard
          files={files}
          handleRemoveClick={handleRemoveFilesMessage}
          handleChangeFilesInput={handleChangeFilesInput}
        />
      )}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="send-message__form"
        autoComplete="off"
      >
        <div className="send-message__form-icon">
          <label htmlFor="files">
            <Image
              sx={{ margin: "0 5px", cursor: "pointer" }}
              color="primary"
            />
          </label>
          <Mic sx={{ margin: "0 5px" }} color="primary" />
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
                        <IconButton onClick={() => setValue("text", "")}>
                          <CancelRounded color="primary" />
                        </IconButton>
                      ) : (
                        ""
                      )}
                      <IconButton onClick={() => setIsShowIcon(!isShowIcon)}>
                        <TagFaces color="primary" />
                      </IconButton>
                      {isShowIcon && (
                        <div className="send-message__emoji">
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <IconButton type="submit">
          <Send color="primary" fontSize="medium" />
        </IconButton>
      </form>
    </div>
  );
}
