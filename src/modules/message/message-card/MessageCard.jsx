import { AvatarOnline } from "@components/avatar/AvatarOnline";
import React from "react";

export default function MessageCard(props) {
  const { type, time, username, text } = props;

  return (
    <>
      {type === "group" ? (
        <div className="message-card__group">{text}</div>
      ) : (
        <div className={`${type === "me" ? "message-card__me" : ""}`}>
          <div className="message-card">
            {type === "friend" && (
              <div className="message-card__avatar">
                <AvatarOnline
                  src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
                  dot={false}
                  size="smaller"
                />
              </div>
            )}
            <div className="message-card__content">
              {type === "friend" && (
                <div className="message-card__content-name">{username}</div>
              )}
              <div className="message-card__content-text">
                {text !== "" && text}
                <div className="message-card__content-text__time">{time}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
