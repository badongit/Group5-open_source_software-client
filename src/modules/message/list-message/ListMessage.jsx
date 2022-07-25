import React from "react";
import MessageCard from "../message-card/MessageCard";

const listMessage = [
  {
    type: "group",
    time: "21:10 pm",
    username: "Minh Phuong",
    text: "This is message of system",
    linkAvatar: "",
  },
  {
    type: "me",
    time: "21:10 pm",
    username: "Minh Phuong",
    text: "hello i'm min",
    linkAvatar: "",
  },
  {
    type: "friend",
    time: "21:10 pm",
    username: "Thu Huong",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consequatur similique ipsam, quo fuga adipisci, voluptate animi quaerat magni repudiandae praesentium repellendus minima voluptas vel exercitationem sed suscipit, quidem tempore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consequatur similique ipsam, quo fuga adipisci, voluptate animi quaerat magni repudiandae praesentium repellendus minima voluptas vel exercitationem sed suscipit, quidem tempore!",
    linkAvatar: "",
  },
  {
    type: "friend",
    time: "21:10 pm",
    username: "Ba Dong",
    text: "adsfdffdfffffffffffffffffffmmmmmmm!",
    linkAvatar: "",
  },
];

export default function ListMessage(props) {
	const { messages } = props;

  return (
    <div className="list-message">
      {listMessage.concat(messages).map((item, index) => (
				<MessageCard
					key={index}
          type={item?.type}
          time={item?.time}
          username={item?.username}
          text={item?.text}
          linkAvatar={item?.linkAvatar}
        />
      ))}
    </div>
  );
}
