import Welcome from "@components/welcome/Welcome";
import { useCurrentUser } from "@hooks/useCurrentUser";
import useMessages from "@hooks/useMessage";
import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, Grid, IconButton } from "@mui/material";
import { SocketEventEnum } from "@socket/constants";
import { useAuthenticatedSocket } from "@socket/hook";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatHeader from "../chat-header/ChatHeader";
import ListMessage from "../list-message/ListMessage";
import MessageDetail from "../message-detail/MessageDetail";
import SendMessage from "../send-message/SendMessage";
import { v4 as uuid } from "uuid";

export default function ChatDesktop(props) {
  const { conversation, otherPeople, handleUpdateReceiveConversation } = props;
  const user = useCurrentUser();
  const { socket, socketService } = useAuthenticatedSocket();
  const [toggleMessageDetail, setToggleMessageDetail] = useState(false);
  const {
    loading,
    listMessage,
    setListMessage,
    setCurrentConversation,
    setConditions,
    lastMessageRef,
    newListMessageAfterNextPage,
  } = useMessages();
  const scrollRef = useRef(null);
  const scrollIntoBotRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [messageDetail, setMessageDetail] = useState(null);

  const handleScrollToBottom = () => {
    const scrolledFromTop = scrollRef.current.scrollTop;
    setVisible(scrolledFromTop > -400);
  };

  const handleSrollIntoView = () => {
    if (scrollIntoBotRef.current) {
      scrollIntoBotRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setConditions((prev) => ({ ...prev, startIndex: 0 }));
    setCurrentConversation(conversation?._id);
  }, [conversation?._id, setCurrentConversation, setConditions]);

  const onToggleMessageDetail = () => {
    setToggleMessageDetail(!toggleMessageDetail);
  };

  const handleSendMessage = useCallback(
    (data) => {
      if (socket) {
        const { text, file } = data;
        const messageEntity = {
          subId: file?.subId || uuid(),
        };

        if (conversation?._id) {
          messageEntity.conversationId = conversation._id;
        } else {
          messageEntity.userId = otherPeople?._id;
        }

        if (text) {
          messageEntity.text = text;
        }

        if (file) {
          messageEntity.file = file;
          messageEntity.metadata = {
            type: file.type,
            name: file.name,
            size: file.size,
          };
        }

        socketService.clientSendMessage(messageEntity);
      }
    },
    [conversation, socket, socketService, otherPeople?._id]
  );

  const handleRenameGroup = useCallback(
    (value) => {
      if (conversation?.type === "group" && socket) {
        socketService.clientRenameGroup({
          conversationId: conversation?._id,
          title: value?.title,
        });
      }
    },
    [conversation, socket, socketService]
  );

  const handleRecallMessage = useCallback(
    (message) => {
      if (message?._id) {
        setMessageDetail(message);
        if (socket) {
          socketService.clientRecallMessage({ messageId: message?._id });
        }
      }
    },
    [socket, socketService]
  );

  /**
   * data: title, description, start, conversationId
   */
  const handleCreateMeeting = useCallback(
    (data) => {
      if (socket) {
        socketService.clientCreateMeeting(data);
      }
    },
    [socket, socketService]
  );

  const handleAddNewMember = useCallback(({conversationId, members}) => {
    if (socket) {
      socketService.clientAddToConversation({
        conversationId,
        members
      })
    }
  }, [socket, socketService])

  const handleReceiveMessage = useCallback(
    (data) => {
      if (data?.message?._id === messageDetail?._id) {
        const index = listMessage.findIndex(
          (value) => value?._id === messageDetail?._id
        );
        setListMessage((prev) => {
          let newMessages = [...prev];
          newMessages[index] = data?.message;
          return newMessages;
        });
      } else if (data?.message?.conversation === conversation?._id) {
        newListMessageAfterNextPage(data?.message);
      }
    },
    [
      newListMessageAfterNextPage,
      conversation?._id,
      messageDetail?._id,
      setListMessage,
      listMessage,
    ]
  );

  useEffect(() => {
    if (socket) {
      socketService.onReceiveMessage(handleReceiveMessage);
    }

    return () => {
      socketService.destroyListeners([SocketEventEnum.SV_SEND_MESSAGE]);
    };
  }, [handleReceiveMessage, socket, socketService]);

  const renderChatHeader = () => {
    let title, isOnline, photoLink;

    if (conversation || otherPeople) {
      if (conversation?.type === "group") {
        const checkOnline = conversation?.members.filter(
          (member) => member.isOnline === true
        );
        title = conversation?.title;
        photoLink = conversation?.photoLink;
        isOnline = checkOnline.length >= 2 ? true : false;
      } else if (conversation?.type === "private") {
        const friends = conversation?.members.find(
          (member) => member._id !== user?._id
        );
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
    );
  };

  return conversation || otherPeople ? (
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
          <div className="chat-desktop__header">{renderChatHeader()}</div>
          <div className="chat-desktop__message">
            <div
              className="chat-desktop__message-btnScroll"
              style={{ visibility: visible ? "hidden" : "visible" }}
            >
              <IconButton onClick={handleSrollIntoView}>
                <ArrowDownward color="primary" />
              </IconButton>
            </div>
            {loading ? (
              <div className="chat-desktop__message-loading">
                <CircularProgress size={26} />
              </div>
            ) : (
              <ListMessage
                messages={listMessage}
                lastMessageRef={lastMessageRef}
                scrollRef={scrollRef}
                onscroll={handleScrollToBottom}
                scrollIntoBotRef={scrollIntoBotRef}
                handleClickRecallMessage={handleRecallMessage}
              />
            )}
          </div>
          <div className="chat-desktop__sendIcon">
            <SendMessage
              handleSendMessage={handleSendMessage}
              conversation={conversation}
              handleCreateMeeting={handleCreateMeeting}
            />
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
            handleAddNewMember={handleAddNewMember}
          />
        </Grid>
      )}
    </Grid>
  ) : (
    <Welcome />
  );
}
