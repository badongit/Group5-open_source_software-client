import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { useCurrentUser } from "@hooks/useCurrentUser";
import Profile from "@modules/user/profile/Profile";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader(props) {
  const user = useCurrentUser();
  const { title, photoLink, isOnline, onToggleMessageDetail ,conversation} = props;
  const [myProfile, setmyProfile] = React.useState(false);
  const [id, setId] = React.useState("");

  const ProfileFriend = ()=>{
    if(conversation.type === "private"){
      setId(conversation.members.filter(u => u._id !== user._id)[0]._id);
      setmyProfile(true) 
    }
  }
  return (
    <div className="chat-header">
      <div className="chat-header__left" onClick = {ProfileFriend}>
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
      {myProfile && (
        <Profile openMyProfile={myProfile} id = {id} />
      )}
    </div>
  );
}
