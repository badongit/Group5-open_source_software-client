import React, { useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { ArrowBack, GroupAdd, Search } from "@mui/icons-material";
import UserSearch from "@modules/user/user-search/UserSearch";
import AddConversationGroup from "@modules/conversation/add-conversation-group/AddConversationGroup";
import ListConversation from "@modules/conversation/list-conversation/ListConversation";
import useUser from "@hooks/useUser";
import { useUserQuery } from "@hooks/useUserQuery";

function ChatBar(props) {
  const {
    data: { user },
  } = useUserQuery();
  const { listUser, loading, handleSearchUser, resetConditions } = useUser();
  const {
    conversations,
    isLoading,
    handleChangeCurrentConversation,
    hanldeChangeOtherPeople,
    handleCreateConversation,
  } = props;
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowAddGourp, setIsShowAddGourp] = useState(false);
  const showAddGroup = () => {
    setIsShowAddGourp(true);
  };
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
          <img src={user?.avatarLink} alt="avatar" />
          {user?.isOnline ? <span className="dot-online"></span> : ""}
        </div>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          {user?.displayname}
        </Typography>
        <GroupAdd
          onClick={showAddGroup}
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
          <UserSearch
            listUser={listUser}
            isLoading={loading}
            handleClickUser={hanldeChangeOtherPeople}
          />
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
      {isShowAddGourp && (
        <AddConversationGroup
          Show={isShowAddGourp}
          onCancel={() => setIsShowAddGourp(false)}
          handleCreateConversation={handleCreateConversation}
          isAddPeople={false}
        />
      )}
    </div>
  );
}

export default ChatBar;
