import { AvatarOnline } from "@components/avatar/AvatarOnline";
import Profile from "@modules/user/profile/Profile";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader(props) {
  const { title, photoLink, isOnline, onToggleMessageDetail ,conversation} = props;
  const [myProfile, setmyProfile] = React.useState(false);

  const ProfileFriend = ()=>{
    console.log(conversation);
  }
  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <AvatarOnline
        onClick = {ProfileFriend}
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
      {myProfile && (
        <Profile openMyProfile={myProfile} id = {"123"} />
      )}
    </div>
  );
}
