// import React from "react";
// import {
//   PauseCircleFilledOutlined,
//   PlayCircleFilledOutlined,
// } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { ReactMic } from "react-mic";

export default function UploadFileRecord(props) {
  //const { record, onStop, handleClickRecord } = props;

  return (
    <div className="upload-file-record">
      {/* <ReactMic
        record={record}
        onStop={onStop}
        mimeType="audio/mp3"
        strokeColor="#fff"
        backgroundColor="#019707"
        className="upload-file-record__mic"
      />
      <div className="upload-file-record__btn">
        <IconButton size="medium" onClick={handleClickRecord}>
          {record ? (
            <PauseCircleFilledOutlined color="primary" />
          ) : (
            <PlayCircleFilledOutlined color="primary" />
          )}
        </IconButton>
      </div> */}
    </div>
  );
}
