import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ChatHeader(props) {
  const { title, photoLink, isOnline, onToggleMessageDetail, curConversation } =
    props;

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
        <Link to={`/video-call/${curConversation?._id}`} target="_blank">
          <IconButton>
            <VideoCameraBack color="primary" />
          </IconButton>
        </Link>
        <IconButton onClick={onToggleMessageDetail}>
          <Error color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
