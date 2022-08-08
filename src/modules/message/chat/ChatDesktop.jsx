import Welcome from "@components/welcome/Welcome";
import { Box, CircularProgress, Grid } from "@mui/material";
import messageServices from "@services/message.services";
import React, { useEffect, useMemo, useState } from "react";
import ChatHeader from "../chat-header/ChatHeader";
import ListMessage from "../list-message/ListMessage";
import MessageDetail from "../message-detail/MessageDetail";
import SendMessage from "../send-message/SendMessage";

export default function ChatDesktop(props) {
  const { conversation } = props;
  const [toggleMessageDetail, setToggleMessageDetail] = useState(false);
  const [listMessages, setListMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const conditions = useMemo(() => {
    return {
      startIndex: 0,
      // limit: 10
    }
  } ,[])

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const response = await messageServices.getMessages(conversation?._id, conditions);

      if (response?.success) {
        setListMessages(response?.data?.messages);
      }
      setLoading(false);
    }

    getMessages();
  }, [conversation, conditions])

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

  return conversation ? (
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
              title={conversation?.title}
              type={conversation?.type}
              photoLink={conversation?.photoLink}
              members={conversation?.members}
              onToggleMessageDetail={onToggleMessageDetail}
            />
          </div>
          <div className="chat-desktop__message">
            {loading ? <CircularProgress size={26} /> : <ListMessage messages={listMessages} />}
          </div>
          <div className="chat-desktop__sendIcon">
            <SendMessage handleSendMessage={handleSendMessage} />
          </div>
        </Box>
      </Grid>
      {toggleMessageDetail && (
        <Grid item xs={12} lg={4} md={6}>
          <MessageDetail
            conversation={conversation}
            setToggleMessageDetail={() => setToggleMessageDetail(false)}
          />
        </Grid>
      )}
    </Grid>
  ) : (
    <Welcome />
  );
}
