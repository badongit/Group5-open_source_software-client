import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ChatDesktop from "@modules/message/chat/ChatDesktop";
import ChatBar from "@modules/message/chat-bar/ChatBar";
import withNotAuth from "@components/common/withNotAuth";
import { useAuthenticatedSocket } from "@socket/hook";
import { SocketEventEnum } from "@socket/constants";
import Helmet from "@components/common/Helmet";
import { useCurrentUser } from "@hooks/useCurrentUser";

function Home(props) {
  const user = useCurrentUser();
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
  };

  const handleReceiveConversations = useCallback((data) => {
    setIsLoading(true);
    if (data?.conversations) {
      setConversations(data?.conversations);
    }
    setIsLoading(false);
  }, []);

  const handleReceiveConversation = useCallback(
    (data) => {
      const { conversation } = data;
      if (conversation) {
        const newCons = conversations.filter(
          (con) => con._id !== conversation?._id
        );
        setConversations([conversation, ...newCons]);

        if (currentConversation?._id === conversation?._id) {
          setCurrentConversation(conversation);
        }
      }
    },
    [currentConversation, conversations]
  );

  const handleUserLeaveConversation = useCallback((data) => {
    const { conversationId, userId } = data;
    if (userId === user._id) {
      const newCons = conversations.filter(con => con._id !== conversationId)
      setConversations(newCons);

      if (currentConversation._id === conversationId) {
        setCurrentConversation(null);
      }
    }
  },
    [conversations, user._id, currentConversation]
  );

  useEffect(() => {
    if (socket) {
      socketService.setUser(user);
      socketService.onInvitationJoinRoom();
    }

    return () => {
      socketService.destroyListeners([
        SocketEventEnum.SV_SEND_USER,
        SocketEventEnum.SV_SEND_INVITATION_JOIN_ROOM,
      ]);
    };
  }, [socket, socketService, user]);

  useEffect(() => {
    if (socket) {
      socketService.onUserLeaveConversation(handleUserLeaveConversation);
      socketService.onReceiveConversations(handleReceiveConversations);
      socketService.onReceiveConversation(handleReceiveConversation);
    }

    return () => {
      socketService.destroyListeners([
        SocketEventEnum.SV_SEND_CONVERSATIONS,
        SocketEventEnum.SV_SEND_CONVERSATION,
        SocketEventEnum.SV_SEND_USER_LEAVE_CONVERSATION,
      ]);
    };
  }, [
    socket,
    socketService,
    handleReceiveConversations,
    handleReceiveConversation,
    handleUserLeaveConversation
  ]);

  useEffect(() => {
    let time;
    if (socket) {
      time = setTimeout(() => {
        socketService.clientGetConversations();
      }, 1000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [socket, socketService]);

  const handleUpdateReceiveConversation = (conversation) => {
    if (conversation) {
      const newCons = conversations.filter(
        (con) => con._id !== conversation?._id
      );
      setConversations([conversation, ...newCons]);

      if (currentConversation?._id === conversation?._id) {
        setCurrentConversation(conversation);
      }
    }
  };

  const handleCreateConversation = (data) => {
    if (socket) {
      socketService.clientCreateConversation({
        members: data?.members,
        type: data?.type,
        title: data?.title,
      });
      socketService.onInvitationJoinRoom();
    }
  };

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
              handleCreateConversation={handleCreateConversation}
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
