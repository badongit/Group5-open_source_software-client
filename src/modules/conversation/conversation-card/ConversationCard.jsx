import React from "react";
import { Typography, Box } from "@mui/material";
import { AvatarOnline } from "@components/avatar/AvatarOnline";

export const ConversationCard = (props) => {
  const { isOnline, title, text, size, time, photoLink, changeConversation } = props;

  return (
    <div className="conversation-card" onClick={changeConversation}>
      <div className="conversation-card__avatar">
        <AvatarOnline
          src={photoLink}
          dot={isOnline}
          size={size}
        />
      </div>
      <div className="conversation-card__content">
        <Typography component="span" className="conversation-card__content-title">{title}</Typography>
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
