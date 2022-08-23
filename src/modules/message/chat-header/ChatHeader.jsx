import React, { useState } from "react";
import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { Error, Phone, VideoCameraBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAuthenticatedSocket } from "@socket/hook";
import { useCurrentUser } from "@hooks/useCurrentUser";
import VideoCallDetail from "../video-call/video-call-detail/VideoCallDetail";

export default function ChatHeader(props) {
  const me = useCurrentUser();
  const {
    title,
    photoLink,
    isOnline,
    onToggleMessageDetail,
    another,
    otherPeople,
  } = props;
  const { socket, socketService } = useAuthenticatedSocket();
  const [openVideoCallDetail, setOpenVideoCallDetail] = useState(false);

  const handleOpenVideo = () => {
    if (socket) {
      socketService.clientSendUserId({ userId: me._id, another });
    }
    setOpenVideoCallDetail(true);
  };

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
        <IconButton onClick={handleOpenVideo}>
          <VideoCameraBack color="primary" />
        </IconButton>
        <IconButton onClick={onToggleMessageDetail}>
          <Error color="primary" />
        </IconButton>
        {openVideoCallDetail && (
          <VideoCallDetail
            openVideoCallDetail={openVideoCallDetail}
            setOpenVideoCallDetail={setOpenVideoCallDetail}
            otherPeople={otherPeople}
            another={another}
          />
        )}
      </div>
    </div>
  );
}
