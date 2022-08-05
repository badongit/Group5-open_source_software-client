import { AvatarOnline } from "@components/avatar/AvatarOnline";
import React from "react";

export default function UserCard(props) {
  const {username, linkAvatar} = props;

  return (
    <div className="user-card">
      <div className="user-card__avatar">
        <AvatarOnline
          src={linkAvatar}
          dot={false}
          size="smaller"
        />
      </div>
      <div className="user-card__name">{username}</div>
    </div>
  );
}
