import React, { useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { ArrowBack, GroupAdd, Search } from "@mui/icons-material";
import UserSearch from "@modules/user/user-search/UserSearch";
import ListConversation from "@modules/conversation/list-conversation/ListConversation";
import useUser from "@hooks/useUser";

function ChatBar(props) {
  const { listUser, loading, handleSearchUser, resetConditions } = useUser();
  const { conversations, handleChangeCurrentConversation, isLoading } = props;
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setTimeout(() => {
      handleSearchUser(value);
    }, 1000);
  };

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
            <ArrowBack
              onClick={() => {
                setIsShowSearch(false);
                setKeyword("");
                resetConditions();
              }}
            />
          </IconButton>
        )}
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={handleChangeKeyword}
          onFocus={() => setIsShowSearch(true)}
        />
        <Search className="message-search__icon" />
      </div>
      {isShowSearch ? (
        <div className="message-user-search">
          <UserSearch listUser={listUser} isLoading={loading} />
        </div>
      ) : (
        <div className="message-conversation">
          {isLoading ? (
            <div className="message-conversation__loading">
              <CircularProgress size={28} />
            </div>
          ) : (
            <ListConversation
              conversations={conversations}
              handleChangeCurrentConversation={handleChangeCurrentConversation}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ChatBar;