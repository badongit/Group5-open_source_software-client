import { useCurrentUser } from "@hooks/useCurrentUser";
import formatTime from "@utils/formatTime";
import React from "react";
import MessageCard from "../message-card/MessageCard";

export default function ListMessage(props) {
  const user = useCurrentUser();
  const {
    messages,
    lastMessageRef,
    scrollRef,
    onscroll,
    scrollIntoBotRef,
    handleClickRecallMessage,
  } = props;

  const renderMessageCard = (message, index) => {
    let type, time, displayname, avatarLink, timeRecall;

    if (type === "system") {
      type = message?.type;
    } else {
      if (message?.sender?._id === user?._id) {
        type = "me";
      } else {
        type = message?.type;
      }

      time = formatTime(message?.createdAt);
      timeRecall = formatTime(message?.deletedAt);
      displayname = message?.sender?.displayname;
      avatarLink = message?.sender?.avatarLink;
    }

    return messages?.length === index + 1 ? (
      <div ref={lastMessageRef} key={index}>
        <MessageCard
          type={type}
          time={time}
          timeRecall={timeRecall}
          file={message.file}
          fileType={message.fileType}
          fileId={message.fileId}
          displayname={displayname}
          text={message?.text}
          avatarLink={avatarLink}
          onclick={() => handleClickRecallMessage(message)}
        />
      </div>
    ) : (
      <MessageCard
        key={index}
        type={type}
        time={time}
        timeRecall={timeRecall}
        file={message.file}
        fileType={message.fileType}
        fileId={message.fileId}
        displayname={displayname}
        text={message?.text}
        avatarLink={avatarLink}
        onclick={() => handleClickRecallMessage(message)}
      />
    );
  };

  return (
    <div className="list-message" ref={scrollRef} onScroll={onscroll}>
      <div ref={scrollIntoBotRef}></div>
      {messages && messages.map(renderMessageCard)}
    </div>
  );
}
