import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader(props) {
  const user = useCurrentUser();
  const { type, title, onToggleMessageDetail, photoLink, members } = props;

  const avatarFriend = type === 'private' && members?.find(member => member._id !== user?._id);

  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <AvatarOnline
          src={type === "group" ? photoLink : avatarFriend?.avatarLink}
          dot={false}
          size="small"
        />
        <p className="chat-header__left-name">{type === "group" ? title : avatarFriend?.displayname}</p>
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
