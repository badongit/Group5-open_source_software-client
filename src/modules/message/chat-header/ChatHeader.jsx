import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ChatHeader(props) {
  const user = useCurrentUser();
  const { title, photoLink, isOnline, onToggleMessageDetail, curConversation } =
    props;

  const friend = curConversation?.members.find(
    (member) => member._id !== user?._id
  );

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
        <Link to={`/video-call/${friend?._id}`} target="_blank">
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
