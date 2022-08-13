import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
import withNotAuth from "@components/common/withNotAuth";
import { useAuthenticatedSocket } from "@socket/hook";
import Helmet from '@components/common/Helmet';

function Home(props) {
  const { socket, socketService } = useAuthenticatedSocket();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);

  const handleChangeCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleReceiveConversations = useCallback((data) => {
    setIsLoading(true);
    setConversations(data?.conversations);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (socket) {
      socketService.onReceiveConversations(handleReceiveConversations);
    }
  }, [socket, socketService, handleReceiveConversations]);

  useEffect(() => {
    if (socket) {
      socketService.clientGetConversations();
    }
  }, [socket, socketService]);

  return (
    <Helmet title="Home page">
      <Box>
        <Grid container>
          <Grid item lg={3}>
            <ChatBar
              isLoading={isLoading}
              conversations={conversations}
              handleChangeCurrentConversation={handleChangeCurrentConversation}
            />
          </Grid>
          <Grid item lg={9}>
            <ChatDesktop
              conversation={currentConversation}
            />
          </Grid>
        </Grid>
      </Box>
    </Helmet>
  );
}

export default withNotAuth(Home);
