import Welcome from "@components/welcome/Welcome";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { Box, CircularProgress, Grid } from "@mui/material";
import messageServices from "@services/message.services";
import { SocketEventEnum } from "@socket/constants";
import { useAuthenticatedSocket } from "@socket/hook";
import React, { useCallback, useEffect, useState } from "react";
import ChatHeader from "../chat-header/ChatHeader";
import ListMessage from "../list-message/ListMessage";
import MessageDetail from "../message-detail/MessageDetail";
import SendMessage from "../send-message/SendMessage";

export default function ChatDesktop(props) {
  const { conversation, otherPeople, receiveConversation, handleUpdateReceiveConversation } = props;
  const user = useCurrentUser();
  const { socket, socketService } = useAuthenticatedSocket();
  const [toggleMessageDetail, setToggleMessageDetail] = useState(false);
  const [listMessages, setListMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState({
    startIndex: 0,
    // limit: 10
  });

  useEffect(() => {
    if (conversation) {
      const getMessages = async () => {
        setLoading(true);
        const response = await messageServices.getMessages(conversation?._id, conditions);
  
        if (response?.success) {
          setListMessages(response?.data?.messages);
        }
        setLoading(false);
      }
      getMessages();
    }
  }, [conversation, conditions])

  const onToggleMessageDetail = () => {
    setToggleMessageDetail(!toggleMessageDetail);
  };

  const handleSendMessage = useCallback(
    (data) => {
      if (socket) {
        socketService.clientSendMessage({
          text: data?.text,
          conversationId: conversation?._id,
          userId: otherPeople?._id,
        });
      }

      // const newMessage = {
      //   text: data?.text,
      //   conversation: conversation?._id,
      //   userId: otherPeople?._id,
      //   type: "user",
      //   sender: user,
      // };
      // setListMessages([newMessage, ...listMessages]);
    },
    [otherPeople, conversation, socket, socketService]
  );

  const handleRenameGroup = useCallback((value) => {
    if (conversation?.type === "group" && socket) {
      socketService.clientRenameGroup({
        conversationId: conversation?._id,
        title: value?.title,
      });
    }
  }, [conversation ,socket, socketService]);

  const handleReceiveMessage = useCallback(
    (data) => {
      if (data?.message?.conversation === conversation?._id) {
        setListMessages([data?.message, ...listMessages]);
      }
    },
    [listMessages, conversation?._id]
  );

  const handleReceiveConversation = useCallback((data) => {
    receiveConversation(data);
  }, [receiveConversation]);

  useEffect(() => {
    if (socket) {
      socketService.onReceiveMessage(handleReceiveMessage);
      socketService.onReceiveConversation(handleReceiveConversation);
    }

    return () => {
      socketService.destroyAllListeners([
        SocketEventEnum.SV_SEND_MESSAGE,
        SocketEventEnum.SV_SEND_CONVERSATION,
      ]);
    };
  }, [handleReceiveMessage, handleReceiveConversation, socket, socketService]);

  const renderChatHeader = () => {
    let title, isOnline, photoLink;

    if (conversation || otherPeople) {
      if (conversation?.type === "group") {
        const checkOnline = conversation?.members.filter(member => member.isOnline === true);
        title = conversation?.title;
        photoLink = conversation?.photoLink;
        isOnline = checkOnline.length >= 2 ? true : false;
      } else if (conversation?.type === "private") {
        const friends = conversation?.members.find(member => member._id !== user?._id);
        title = friends?.displayname;
        photoLink = friends?.avatarLink;
        isOnline = friends?.isOnline;
      } else {
        title = otherPeople?.displayname;
        photoLink = otherPeople?.avatarLink;
        isOnline = otherPeople?.isOnline;
      }
    }

    return (
      <ChatHeader
        title={title}
        isOnline={isOnline}
        photoLink={photoLink}
        onToggleMessageDetail={onToggleMessageDetail}
      />
    )
  }

  return (conversation || otherPeople) ? (
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
            {renderChatHeader()}
          </div>
          <div className="chat-desktop__message">
            {loading ? (
              <div className="chat-desktop__message-loading">
                <CircularProgress size={26} />
              </div>
            ) : (
              <ListMessage messages={listMessages} />
            )}
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
            otherPeople={otherPeople}
            setToggleMessageDetail={() => setToggleMessageDetail(false)}
            handleRenameGroup={handleRenameGroup}
            handleUpdateReceiveConversation={handleUpdateReceiveConversation}
          />
        </Grid>
      )}
    </Grid>
  ) : (
    <Welcome />
  );
}
