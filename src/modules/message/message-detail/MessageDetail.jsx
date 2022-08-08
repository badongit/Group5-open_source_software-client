import React, { useState } from "react";
import {
  CameraAlt,
  Close,
  Image,
  InsertDriveFileOutlined,
  Logout,
  OndemandVideo,
} from "@mui/icons-material";
import { Button, IconButton, List, Typography } from "@mui/material";
import UploadImage from "@components/upload-image/UploadImage";
import { AvatarOnline } from "@components/avatar/AvatarOnline";
import CollapsedItem from "@components/collapsed-item/CollapsedItem";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Box } from "@mui/system";
import { useCurrentUser } from "@hooks/useCurrentUser";

export default function MessageDetail(props) {
  const user = useCurrentUser();
  const { conversation, setToggleMessageDetail } = props;
  const { type, title, photoLink, members } = conversation;
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [isLeaveGroup, setIsLeaveGroup] = useState(false);

  const friend =
    type === "private" && members?.find((member) => member._id !== user?._id);

  return (
    <div className="message-detail">
      <div className="message-detail__top">
        <IconButton onClick={setToggleMessageDetail}>
          <Close />
        </IconButton>
      </div>
      <div className="message-detail__upload">
        <div className="message-detail__upload-avatar">
          <AvatarOnline
            src={type === "group" ? photoLink : friend?.avatarLink}
            dot={false}
            size="large"
          />
          {type === "group" ? (
            <div
              className="message-detail__upload-avatar-icon"
              onClick={() => setOpenModalUpload(true)}
            >
              <CameraAlt fontSize="16" />
            </div>
          ) : (
            ""
          )}
        </div>
        <Typography variant="h6" align="center" gutterBottom={true}>
          {type === "group" ? title : friend?.displayname}
        </Typography>
      </div>
      {type === "group" ? (
        <div>
          <UploadImage
            openModalUpload={openModalUpload}
            setOpenModalUpload={setOpenModalUpload}
          />
        </div>
      ) : (
        ""
      )}
      <div className="message-detail__list">
        <List component="nav" aria-labelledby="nested-list-subheader">
          {type === "group" ? (
            <CollapsedItem
              id="1"
              name="Chat members"
              dataCollapsed={members ? members : []}
            />
          ) : (
            ""
          )}
          <CollapsedItem
            id="2"
            name="Files media"
            dataCollapsed={[
              { id: 1, title: "Image", icon: <Image /> },
              { id: 2, title: "Video", icon: <OndemandVideo /> },
              { id: 3, title: "File", icon: <InsertDriveFileOutlined /> },
            ]}
          />
          {type === "group" ? (
            <CollapsedItem
              id="3"
              name="Privacy"
              dataCollapsed={[
                {
                  id: 1,
                  title: "Leave group",
                  icon: <Logout />,
                  isLeave: true,
                },
              ]}
              handleClickItem={() => setIsLeaveGroup(true)}
            />
          ) : (
            ""
          )}
        </List>
      </div>

      {isLeaveGroup && (
        <CustomDialog
          open={isLeaveGroup}
          title="Leave group?"
          className="custom-dialog__title"
          iconBtn={
            <div className="custom-dialog__title-icon">
              <IconButton onClick={() => setIsLeaveGroup(false)}>
                <Close />
              </IconButton>
            </div>
          }
          content={
            <Typography>Are you sure you want to leave this group?</Typography>
          }
          actions={
            <Box>
              <Button size="small" variant="contained" color="primary">
                leave
              </Button>
              <Button
                size="small"
                variant="contained"
                color="inherit"
                sx={{ marginLeft: "10px" }}
                onClick={() => setIsLeaveGroup(false)}
              >
                cancel
              </Button>
            </Box>
          }
        />
      )}
    </div>
  );
}
