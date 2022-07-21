import React from "react";
import { Box, Typography } from "@mui/material";
import { Search, Settings } from "@mui/icons-material";
import Conversation from "@components/conversation";

function Message() {
  return (
    <div className="message">
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        Messages
      </Typography>
      <div className="line"></div>
      <Box
        sx={{
          textAlign: "center",
          position: "relative",
        }}
      >
        <div className="message-info">
          <img
            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
            alt=""
          />
          <span className="dot-online"></span>
        </div>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Min Min
        </Typography>
        <Settings
          sx={{
            position: "absolute",
            color: "#bbbbbb",
            fontSize: "18px",
            opacity: 0.8,
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        />
      </Box>
			<div className="message-search">
				<input type="text" placeholder="Search" />
				<Search className="message-search__icon"/>
			</div>
			<div className="message-conversation">
				<Conversation />
			</div>
    </div>
  );
}

export default Message;
