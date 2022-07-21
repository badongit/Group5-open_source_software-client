import React from 'react';
import { Avatar } from "@mui/material";

export function AvatarOnline(props) {
  const { src, size, dot } = props;

  return (
    <Avatar
      src={src}
      alt='avatar'
      className={`avatar-online ${size} ${dot ? 'online' : ''}`}
    />
  );
}