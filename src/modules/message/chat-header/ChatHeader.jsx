import React, { useState } from "react";
import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import VideoCall from "../video-call/video-call-ui/VideoCall";
import VideoCallDetail from "../video-call/video-call-detail/VideoCallDetail";

export default function ChatHeader(props) {
  const { title, photoLink, isOnline, onToggleMessageDetail } = props;
  const [openVideoCall, setOpenVideoCall] = useState(false);
  const isUser = true;
  const isOtherPeople = false;

  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <AvatarOnline src={photoLink} dot={isOnline} size="small" />
        <p className="chat-header__left-name">{title}</p>
      </div>
      <div className="chat-header__right">
        <IconButton>
          <Phone color="primary" />
        </IconButton>
        <IconButton onClick={() => setOpenVideoCall(true)}>
          <VideoCameraBack color="primary" />
        </IconButton>
        <IconButton onClick={onToggleMessageDetail}>
          <Error color="primary" />
        </IconButton>
      </div>
      {openVideoCall && isOtherPeople && (
        <VideoCall open={openVideoCall} setOpen={setOpenVideoCall} />
      )}
      {openVideoCall && isUser && (
        <VideoCallDetail open={openVideoCall} setOpen={setOpenVideoCall} />
      )}
    </div>
  );
}
