import dayDiff from "@utils/dayDiff";
import React from "react";
import { ConversationCard } from "../conversation-card/ConversationCard";

export default function ListConversation(props) {
  const { conversations, handleChangeCurrentConversation } = props;
  const userId = "62cc48b9fcba316c5751a890";

  const renderConversationCard = (conversation) => {
    const { type, members, lastMessage, _id } = conversation;
    const time = dayDiff(lastMessage?.createdAt);

    let title, text, photoLink, isOnline;
    if (type === "group") {
      title = conversation?.title;
      photoLink = conversation?.photoLink;
      isOnline = members.some((member) => member?.isOnline === true);
    } else {
      const member = members.find((member) => member._id !== userId);
      title = member?.displayname;
      photoLink = member?.avatarLink;
      isOnline = member?.isOnline;
    }

    if (lastMessage?.type === "user") {
      if (lastMessage?.sender === userId) {
        text = `You: ${lastMessage?.text}`;
      } else {
        const sender = members.find((member) => member._id === lastMessage?.sender);
        text = `${sender?.displayname}: ${lastMessage?.text}`;
      }
    } else {
      text = lastMessage?.text;
    }

    return (
      <ConversationCard
        key={_id}
        isOnline={isOnline}
        title={title}
        text={text}
        photoLink={photoLink}
        size="small"
        time={time}
        changeConversation={handleChangeCurrentConversation}
      />
    );
  };

  return (
    <div className="list-conversation">
      {conversations && conversations.map(renderConversationCard)}
    </div>
  );
}
