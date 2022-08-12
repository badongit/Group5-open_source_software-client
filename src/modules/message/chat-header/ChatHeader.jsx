import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader(props) {
  const { title, photoLink, isOnline, onToggleMessageDetail } = props;

  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <AvatarOnline
          src={photoLink}
          dot={isOnline}
          size="small"
        />
        <p className="chat-header__left-name">{title}</p>
      </div>
      <div className="chat-header__right">
        <IconButton>
          <Phone color="primary" />
        </IconButton>
        <IconButton>
          <VideoCameraBack color="primary" />
        </IconButton>
        <IconButton onClick={onToggleMessageDetail}>
          <Error color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
