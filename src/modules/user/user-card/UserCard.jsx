import { AvatarOnline } from "@components/avatar/AvatarOnline";
import React from "react";

export default function UserCard(props) {
  const {username, linkAvatar, isOnline,  onClickUserCard} = props;

  return (
    <div className="user-card" onClick={onClickUserCard}>
      <div className="user-card__avatar">
        <AvatarOnline
          src={linkAvatar}
          dot={isOnline}
          size="smaller"
        />
      </div>
      <div className="user-card__name">{username}</div>
    </div>
  );
}
