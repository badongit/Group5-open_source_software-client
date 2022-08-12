import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
import withNotAuth from "@components/common/withNotAuth";
import { useAuthenticatedSocket } from "@socket/hook";
import { SocketEventEnum } from "@socket/constants";
import Helmet from '@components/common/Helmet';

function Home(props) {
  const { socket, socketService } = useAuthenticatedSocket();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [otherPeople, setOtherPeople] = useState(null);

  const handleChangeCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
    setOtherPeople(null);
  };

  const hanldeChangeOtherPeople = (user) => {
    setOtherPeople(user);
    setCurrentConversation(null);
  }

  const handleReceiveConversations = useCallback((data) => {
    setIsLoading(true);
    if (data?.conversations) {
      setConversations(data?.conversations);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (socket) {
      socketService.onReceiveConversations(handleReceiveConversations);
    }

    return () => {
      socketService.destroyAllListeners([SocketEventEnum.SV_SEND_CONVERSATIONS]);
    };
  }, [socket, socketService, handleReceiveConversations]);

  useEffect(() => {
    let time;
    if (socket) {
      time = setTimeout(() => {
        socketService.clientGetConversations();
      }, 3000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [socket, socketService]);

  const handleReceiveConversation = (data) => {
    const { conversation } = data;
    if (conversation) {
      const newCons = conversations.filter(con => con._id !== conversation?._id);
      setConversations([conversation, ...newCons]);

      if (currentConversation?._id === conversation?._id) {
        setCurrentConversation(conversation);
      }
    }
  }

  const handleUpdateReceiveConversation = (conversation) => {
    if (conversation) {
      const newCons = conversations.filter(con => con._id !== conversation?._id);
      setConversations([conversation, ...newCons]);

      if (currentConversation?._id === conversation?._id) {
        setCurrentConversation(conversation);
      }
    }
  }

  return (
    <Helmet title="Home page">
      <Box>
        <Grid container>
          <Grid item lg={3}>
            <ChatBar
              isLoading={isLoading}
              conversations={conversations}
              handleChangeCurrentConversation={handleChangeCurrentConversation}
              hanldeChangeOtherPeople={hanldeChangeOtherPeople}
            />
          </Grid>
          <Grid item lg={9}>
            <ChatDesktop
              conversation={currentConversation}
              otherPeople={otherPeople}
              receiveConversation={handleReceiveConversation}
              handleUpdateReceiveConversation={handleUpdateReceiveConversation}
            />
          </Grid>
        </Grid>
      </Box>
    </Helmet>
  );
}

export default withNotAuth(Home);
