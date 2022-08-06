import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Input from "@mui/material/Input";
import React, { useState } from "react";

const Profile = ({ data, openMyProfile }) => {
  const [open, setopen] = useState(openMyProfile);
  const [viewDetail, setViewDetail] = React.useState(false);
  const [updateProfile, setUpdateProfile] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const handleViewDetail = (url) => {
    setViewDetail(true);
    setUrl(url);
  };

  const handleChangeFile = (e) => {
    setFileUpload(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const SaveProfile = () => {
    setUpdateProfile(false);
  };
  return (
    <div>
      <CustomDialog
        open={open}
        title="Profile"
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
            <div className="profile-content_header">
              <div
                className="profile-content_header_bgr"
                onClick={() => handleViewDetail(data.urlBackground)}
              >
                <img alt="Ảnh bìa" src={data.urlBackground} />
              </div>
              {updateProfile ? (
                <label className="profile-content_header_edit-bgr">
                  <CameraAltIcon className="cam"></CameraAltIcon>
                  <input
                    accept="image/*"
                    className="upload-image__input-upload"
                    id="input-upload"
                    type="file"
                    onChange={handleChangeFile}
                  />
                </label>
              ) : (
                ""
              )}
              <div
                className="profile-content_header_avt"
                onClick={() => handleViewDetail(data.urlAvatar)}
              >
                {fileUpload == null ? (
                  <img
                    alt="Ảnh đại điện"
                    src={data.urlAvatar}
                    htmlFor="input-upload"
                  />
                ) : (
                  <img
                    htmlFor="input-upload"
                    src={fileUpload && URL.createObjectURL(fileUpload)}
                    alt=""
                  />
                )}
                <input
                  accept="image/*"
                  className="upload-image__input-upload"
                  id="input-upload"
                  type="file"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
            <h5>{data.fullname}</h5>
            <div className="profile-content_infor">
              <h5>Personal Information</h5>
              <div className="profile-content_infor_item">
                Username{" "}
                {updateProfile ? (
                  <Input
                    className="input"
                    autoFocus={true}
                    defaultValue={data.phoneNumber}
                  />
                ) : (
                  <span>{data.phoneNumber}</span>
                )}
              </div>
              <div className="profile-content_infor_item">
                Gender
                {updateProfile ? (
                  <form className="group-radio">
                    <label>
                      <input
                        name="gender"
                        type="radio"
                        value="Male"
                        defaultChecked={data.gender === "Male" ? true : false}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        name="gender"
                        type="radio"
                        value="Female"
                        defaultChecked={data.gender === "Female" ? true : false}
                      />{" "}
                      Female
                    </label>
                  </form>
                ) : (
                  <span>{data.gender}</span>
                )}
              </div>
              <div className="profile-content_infor_item">
                Date of birth
                {updateProfile ? (
                  <Input className="input" defaultValue={data.birthday} />
                ) : (
                  <span>{data.birthday}</span>
                )}
              </div>
              <div className="profile-content_infor_item">
                Address
                {updateProfile ? (
                  <Input className="input" defaultValue={data.address} />
                ) : (
                  <span>{data.address}</span>
                )}
              </div>
            </div>
          </div>
        }
        actions={
          !updateProfile ? (
            <div
              className="update-profile"
              onClick={() => setUpdateProfile(true)}
            >
              <BorderColorIcon className="update-profile_icon" />
              Update profile
            </div>
          ) : (
            <div className="update-profile-btn">
                <div className="update-profile-btn_item cancel" onClick={() => setUpdateProfile(false)}>
                    Cancel
                </div>
                <div className="update-profile-btn_item save" onClick={SaveProfile}>
                    Save
                </div>
            </div>
          )
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
