import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import fileBlank from "../../../assets/images/file-blank.png";

export default function MessageCard(props) {
  const {
    type,
    time,
    timeRecall,
    displayname,
    text,
    avatarLink,
    onclick,
    file,
    fileType,
    fileId,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const openMore = Boolean(anchorEl);

  const handleOpenMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let content = text;
  if (file) {
    switch (fileType) {
      case "image":
        content = (
          <div className="message-card__content-file__img">
            <img src={file} alt="message" />
          </div>
        );
        break;
      case "video":
        content = (
          <div className="message-card__content-file__video">
            <video src={file} controls></video>
          </div>
        );
        break;
      case "audio":
        content = (
          <div className="message-card__content-file__audio">
            <audio src={file} controls></audio>
          </div>
        );
        break;
      case "normal":
        content = (
          <div className="message-card__content-file__normal">
            <img src={fileBlank} alt="file-normal" />
            <a href={file} download={file} target="_blank" rel="noreferrer">
              {fileId}
            </a>
          </div>
        );
        break;
      default:
        break;
    }
  }

  return (
    <>
      {type === "system" ? (
        <div className="message-card__group">{text}</div>
      ) : (
        <div className={`${type === "me" ? "message-card__me" : ""}`}>
          <div className="message-card">
            {type === "user" && (
              <div className="message-card__avatar">
                <AvatarOnline src={avatarLink} dot={false} size="smaller" />
              </div>
            )}
            <div className="message-card__content">
              {type === "user" && (
                <div className="message-card__content-name">{displayname}</div>
              )}
              <div
                className={
                  text === "Message has been revoked."
                    ? "message-card__content-text recall"
                    : fileType
                    ? "message-card__content-file"
                    : "message-card__content-text"
                }
              >
                {content}
                {type === "me" && text !== "Message has been revoked." ? (
                  <div className="message-card__content-text__more">
                    <Tooltip title="See more" placement="top">
                      <IconButton onClick={handleOpenMore}>
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                    {openMore && (
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openMore}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem onClick={onclick}>Recall, Delete</MenuItem>
                      </Menu>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="message-card__content-text__time">
                  {text !== "Message has been revoked." ? time : timeRecall}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
