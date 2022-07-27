import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "../chat-header/ChatHeader";
import ListMessage from "../list-message/ListMessage";
import MessageDetail from "../message-detail/MessageDetail";
import SendMessage from "../send-message/SendMessage";

export default function ChatDesktop() {
  const [toggleMessageDetail, setToggleMessageDetail] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "",
      type: "",
      time: "",
      username: "",
      linkAvatar: "",
    },
  ]);

  const onToggleMessageDetail = () => {
    setToggleMessageDetail(!toggleMessageDetail);
  };

  const handleSendMessage = (data) => {
    const values = {
      text: data?.text,
      type: "me",
      time: "21:10 pm",
      username: "Minh Phuong",
      linkAvatar: "",
    };

    setMessages([...messages, values]);
  };

  return (
    <Grid container>
      <Grid item xs>
        <Box
          className="chat-desktop"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <div className="chat-desktop__header">
            <ChatHeader
              name="Minh Phuong"
              onToggleMessageDetail={onToggleMessageDetail}
            />
          </div>
          <div className="chat-desktop__message">
            <ListMessage messages={messages} />
          </div>
          <div className="chat-desktop__sendIcon">
            <SendMessage handleSendMessage={handleSendMessage} />
          </div>
        </Box>
      </Grid>
      {toggleMessageDetail && (
        <Grid item xs={12} lg={4} md={6}>
          <MessageDetail
            setToggleMessageDetail={() => setToggleMessageDetail(false)}
          />
        </Grid>
      )}
    </Grid>
  );
}
