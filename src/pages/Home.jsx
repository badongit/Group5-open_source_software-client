import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
import withNotAuth from "@components/common/withNotAuth";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuthenticatedSocket } from "@socket/hook";

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
    <HelmetProvider>
      <Helmet>
        <title>Home page</title>
      </Helmet>
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
    </HelmetProvider>
  );
}

export default withNotAuth(Home);
