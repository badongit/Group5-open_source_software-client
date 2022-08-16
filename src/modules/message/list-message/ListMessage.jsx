import { useCurrentUser } from "@hooks/useCurrentUser";
import formatTime from "@utils/formatTime";
import React from "react";
import MessageCard from "../message-card/MessageCard";

export default function ListMessage(props) {
  const user = useCurrentUser();
  const { messages } = props;

  const renderMessageCard = (message, index) => {
    let type, time, displayname, avatarLink;

    if (type === "system") {
      type = message?.type;
    } else {
      if (message?.sender?._id === user?._id) {
        type = "me";
      } else {
        type = message?.type;
      }

      time = formatTime(message?.createdAt);
      displayname = message?.sender?.displayname;
      avatarLink = message?.sender?.avatarLink;
    }

    return (
      <MessageCard
        key={index}
        type={type}
        time={time}
        file={message.file}
        displayname={displayname}
        text={message?.text}
        avatarLink={avatarLink}
        fileType={message.fileType}
      />
    );
  };

  return (
    <div className="list-message">
      {messages && messages.map(renderMessageCard)}
    </div>
  );
}
