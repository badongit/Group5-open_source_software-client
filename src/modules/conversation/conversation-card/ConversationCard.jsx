import React from "react";
import { Typography, Box } from "@mui/material";
import { AvatarOnline } from "@components/avatar/AvatarOnline";

export const ConversationCard = (props) => {
  const { isOnline, username, text, size, time } = props;

  return (
    <div className="conversation-card">
      <div className="conversation-card__avatar">
        <AvatarOnline
          src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
          dot={isOnline}
          size={size}
        />
      </div>
      <div className="conversation-card__content">
        <Typography component="span" className="conversation-card__content-title">{username}</Typography>
        {text && (
          <Box display="flex">
            <Typography noWrap className="conversation-card__content-text">{text}</Typography>
            <Typography className="conversation-card__content-time">{time}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};
