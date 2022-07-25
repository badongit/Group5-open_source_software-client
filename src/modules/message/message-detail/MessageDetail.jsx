import React, { useState } from "react";
import { CameraAlt, Close, Image, InsertDriveFileOutlined, Logout, OndemandVideo } from "@mui/icons-material";
import { Button, IconButton, List, Typography } from "@mui/material";
import UploadImage from "@components/upload-image/UploadImage";
import { AvatarOnline } from "@components/avatar/AvatarOnline";
import CollapsedItem from "@components/collapsed-item/CollapsedItem";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Box } from "@mui/system";

const dataCollapsed = [
  {
    "id": 1,
    "name": "Chat member",
    "results": [
      {
        "id": 1,
        "title": "Min Min",
        "linkAvatar": "https://i.pinimg.com/736x/b8/1c/4e/b81c4e85c01042c0efc80521571ea2c1.jpg"
      },
      {
        "id": 2,
        "title": "Đông",
        "linkAvatar": "https://i.pinimg.com/736x/b8/1c/4e/b81c4e85c01042c0efc80521571ea2c1.jpg"
      },
      {
        "id": 3,
        "title": "Dương",
        "linkAvatar": "https://i.pinimg.com/736x/b8/1c/4e/b81c4e85c01042c0efc80521571ea2c1.jpg"
      },
      {
        "id": 4,
        "title": "Hường",
        "linkAvatar": "https://i.pinimg.com/736x/b8/1c/4e/b81c4e85c01042c0efc80521571ea2c1.jpg"
      },
      {
        "id": 5,
        "title": "Phương Sapphire",
        "linkAvatar": "https://i.pinimg.com/736x/b8/1c/4e/b81c4e85c01042c0efc80521571ea2c1.jpg"
      },
    ]
  },
  {
    "id": 2,
    "name": "Media files",
    "results": [
      {
        "id": 1,
        "title": "Image",
        "icon": <Image />
      },
      {
        "id": 2,
        "title": "Video",
        "icon": <OndemandVideo />
      },
      {
        "id": 3,
        "title": "File",
        "icon": <InsertDriveFileOutlined />
      },
    ]
  },
  {
    "id": 3,
    "name": "Privacy",
    "results": [
      {
        "id": 1,
        "title": "Leave group",
        "icon": <Logout />,
        "isLeave": true
      },
    ]
  }
]

export default function MessageDetail(props) {
  const { setToggleMessageDetail } = props;
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [isLeaveGroup, setIsLeaveGroup] = useState(false);

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
            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
            dot={false}
            size="large"
          />
          <div
            className="message-detail__upload-avatar-icon"
            onClick={() => setOpenModalUpload(true)}
          >
            <CameraAlt fontSize="16" />
          </div>
        </div>
        <Typography variant="h6" align="center" gutterBottom={true}>
          Nhóm CNTT
        </Typography>
      </div>
      <div>
        <UploadImage
          openModalUpload={openModalUpload}
          setOpenModalUpload={setOpenModalUpload}
        />
      </div>
      <div className="message-detail__list">
        <List component="nav" aria-labelledby="nested-list-subheader">
          {dataCollapsed.map((item, index) => {
            return (
              <CollapsedItem
                key={index}
                dataCollapsed={item}
                handleClickItem={() => setIsLeaveGroup(true)}
              />
            );
          })}
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
              <Button size="small" variant="contained" color="primary" >leave</Button>
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
