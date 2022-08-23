import { AccessAlarm, CancelRounded, Image, Mic, Send, TagFaces } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import ListUploadCard from "@components/list-upload-card/ListUploadCard";
import UploadFileRecord from "@components/upload-file-record/UploadFileRecord";
import CreateMeeting from "@components/create-meeting-schedule/CreateMeeting";

export default function SendMessage({ handleSendMessage, conversation, handleCreateMeeting }) {
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [files, setFiles] = useState([]);
  const [record, setRecord] = useState(false);
  const [isOpenRecord, setIsOpenRecord] = useState(false);
  const [recordAudio, setRecordAudio] = useState(null);
  const [isCreateMeeting, setIsCreateMeeting] = useState(false);

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
    if (recordAudio) {
      handleSendMessage({ file: recordAudio });
      setIsOpenRecord(false);
    }
    setRecordAudio(null);
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

  const handleClickRecord = () => {
    setRecord(!record);
  };

  const handleStopRecord = async (recordedBlob) => {
    const blob = new Blob([recordedBlob["blob"]], {
      type: recordedBlob.options.mimeType,
    });

    let file = new File([blob], `record-voice-${uuid()}.mp3`, {
      type: blob.type,
      lastModified: new Date().getTime(),
    });
    file.subId = uuid();

    setRecordAudio(file);
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
      {/* send record voice */}
      {isOpenRecord && (
        <UploadFileRecord
          record={record}
          onStop={handleStopRecord}
          handleClickRecord={handleClickRecord}
        />
      )}
      {/* create a meeting schedule */}
      {isCreateMeeting && (
        <CreateMeeting
          isCreateMeeting={isCreateMeeting}
          setIsCreateMeeting={setIsCreateMeeting}
          conversation={conversation}
          onCreateMeeting={handleCreateMeeting}
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
          <IconButton
            sx={{ margin: "0 5px" }}
            onClick={() => setIsOpenRecord(!isOpenRecord)}
          >
            <Mic color="primary" />
          </IconButton>
          {conversation?.type === "group" && (
            <IconButton onClick={() => setIsCreateMeeting(!isCreateMeeting)}>
              <AccessAlarm color="primary" />
            </IconButton>
          )}
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
