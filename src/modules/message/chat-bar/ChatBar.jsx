import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack, GroupAdd, Search } from "@mui/icons-material";
import Conversation from "@modules/conversation";
import UserSearch from "@modules/user/user-search/UserSearch";
import AddConversationGroup from "@modules/conversation/conversation-group/AddConversationGroup";

function ChatBar() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowAddGourp, setIsShowAddGourp] = useState(false);
  const showAddGroup = ()=>{
    setIsShowAddGourp(true);
  }
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
        <GroupAdd 
          onClick = {showAddGroup}
          sx={{
            position: "absolute",
            color: "#bbbbbb",
            fontSize: "20px",
            opacity: 0.8,
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        />
      </Box>
      <div className="message-search">
        {isShowSearch && (
          <IconButton sx={{ marginRight: "5px" }}> 
            <ArrowBack />
          </IconButton>
        )}
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setIsShowSearch(true)}
          onBlur={() => setIsShowSearch(false)}
        />
        <Search className="message-search__icon" />
      </div>
      {isShowSearch ? (
        <div className="message-user-search">
          <UserSearch />
        </div>
      ) : (
        <div className="message-conversation">
          <Conversation />
        </div>
      )}
      {
        isShowAddGourp && <AddConversationGroup Show={isShowAddGourp} onCancel={() =>setIsShowAddGourp(false) } />
      }
    </div>
  );
}

export default ChatBar;
