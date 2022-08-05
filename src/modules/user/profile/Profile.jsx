import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React, { useState } from "react";

const Profile = ({ data, openMyProfile }) => {
  const [open, setopen] = useState(openMyProfile);
  const [viewDetail, setViewDetail] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const handleViewDetail = (url) => {
    setViewDetail(true);
    setUrl(url);
  };
  return (
    <div>
      <CustomDialog
        open={open}
        title="Nguyễn Văn Dương"
        className="custom-dialog__title profile-dialog"
        iconBtn={
          <div className="custom-dialog__title-icon">
            <IconButton onClick={() => setopen(false)}>
              <Close />
            </IconButton>
          </div>
        }
        content={
          <div className="profile-content">
            <div
              className="profile-content_bgr"
              onClick={() => handleViewDetail(data.urlBackground)}
            >
              <img alt="Ảnh bìa" src={data.urlBackground} />
            </div>
            <div className="profile-content_edit-bgr">
              <CameraAltIcon className="cam">Chỉnh sửa ảnh bìa</CameraAltIcon>
            </div>
            <div
              className="profile-content_avt"
              onClick={() => handleViewDetail(data.urlAvatar)}
            >
              <img alt="Ảnh đại điện" src={data.urlAvatar} />
            </div>
            <h4 >{data.fullname}</h4>
            1232131321
          </div>
        }
        actions={
          <div className="update-profile">
              <BorderColorIcon className="update-profile_icon" />
              Cập nhập thông tin
          </div>
        }
      />
      {viewDetail && (
        <Dialog open={viewDetail} className="avt-detail">
          <CloseIcon
            className="avt-detail-close"
            onClick={() => setViewDetail(false)}
          />
          <img alt="Cindy Baker" src={url} />
        </Dialog>
      )}
    </div>
  );
};

export default Profile;
