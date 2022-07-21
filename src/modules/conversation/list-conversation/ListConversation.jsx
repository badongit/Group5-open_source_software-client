import React from "react";
import { ConversationCard } from "../conversation-card/ConversationCard";

export default function ListConversation() {
  return (
    <div className="list-conversation">
      <ConversationCard
        isOnline={true}
        username="Min Min"
        text="Hello"
        size="small"
        time="09:04 AM"
      />
      <ConversationCard
        isOnline={false}
        username="Min Min"
        text="Hello, this is Min Min Min Min Min Min Min"
        size="small"
        time="09:04 AM"
      />
      <ConversationCard
        isOnline={false}
        username="Min Min"
        text="Hello, this is Min Min Min Min Min Min Min"
        size="small"
        time="09:04 AM"
      />
      <ConversationCard
        isOnline={false}
        username="Min Min"
        text="Hello, this is Min Min Min Min Min Min Min"
        size="small"
        time="09:04 AM"
      />
      <ConversationCard
        isOnline={false}
        username="Min Min"
        text="Hello, this is Min Min Min Min Min Min Min"
        size="small"
        time="09:04 AM"
      />
    </div>
  );
}
