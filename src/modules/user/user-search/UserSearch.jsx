import React from "react";
import UserCard from "../user-card/UserCard";
import { CircularProgress } from "@mui/material";

export default function UserSearch(props) {
  const { listUser, isLoading } = props;

  return (
    <div className="user-search">
      {isLoading ? (
        <div className="user-search__loading">
          <CircularProgress size={28} />
        </div>
      ) : (
        listUser.map((item, index) => {
          return (
            <UserCard key={index} linkAvatar={item?.avatarLink} username={item?.displayname} />
          );
        })
      )}
    </div>
  );
}
