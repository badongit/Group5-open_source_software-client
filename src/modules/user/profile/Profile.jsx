import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm } from "react-hook-form";
import BlockIcon from "@mui/icons-material/Block";
import userServices from "@services/user.services";
import authServices from "@services/auth.services";
import { useDispatch } from "react-redux";
import { authSetDataAction } from "@store/auth/auth.action";

const Profile = ({ id, dataUser, openMyProfile, friend = true }) => {
  const [open, setopen] = useState(openMyProfile);
  const [viewDetail, setViewDetail] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [url, setUrl] = React.useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [user, setUser] = useState(null);
  const [datePicker, setDatePicker] =useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUsers = async () => {
      if (!friend) {
        setUser(dataUser);
        return;
      }
      const response = await userServices.getUserById(id);
      if (response?.success) {
        setUser(response?.data?.user);
      }
    };
    getUsers();
  }, [id, friend, dataUser]);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      displayname: user?.displayname,
      gender: user?.gender,
    },
  });

  const handleViewDetail = (url) => {
    setViewDetail(true);
    setUrl(url);
  };
  const handleChangeFile = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const SaveProfile = async () => {
    setUpdateProfile(false);
    if (
      user.displayname !== getValues().displayname ||
      user.gender !== getValues().gender ||
      user.dateOfBirth !== datePicker
    ) {
      const res = await authServices.updateProfile({
        dateOfBirth: datePicker,
        displayname: getValues().displayname,
        gender: getValues().gender,
      });
      setUser(res?.data?.user);
    }
    if (fileUpload != null) {
      let formData = new FormData();
      formData.append("avatar", fileUpload);
      const responseAvt = await authServices.changeAvatar({
        files: formData,
      });
      dispatch(authSetDataAction({ user: responseAvt?.data?.user }));
    }
  };
  const BlockUser = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit(SaveProfile)}>
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
                  onClick={() => handleViewDetail(user?.avatarLink)}
                >
                  <img alt="Ảnh bìa" src={user?.avatarLink} />
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
                  onClick={() => handleViewDetail(user?.avatarLink)}
                >
                  {fileUpload == null ? (
                    <img
                      alt="Ảnh đại điện"
                      src={user?.avatarLink}
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
              <h5>{user?.displayname}</h5>
              <div className="profile-content_infor">
                {!updateProfile ? <h5>Personal Information</h5> : ""}

                {updateProfile ? (
                  ""
                ) : (
                  <div className="profile-content_infor_item">
                    <label>Email</label>
                    <span>{user?.email}</span>
                  </div>
                )}

                <div className="profile-content_infor_item">
                  <label>Display name</label>
                  {updateProfile ? (
                    <Input
                      className="input"
                      autoFocus={true}
                      defaultValue={user?.displayname}
                      {...register("displayname")}
                    />
                  ) : (
                    <span>{user?.displayname}</span>
                  )}
                </div>
                <div className="profile-content_infor_item">
                  <label>Gender</label>
                  {updateProfile ? (
                    <form className="group-radio">
                      <label>
                        <input
                          name="gender"
                          type="radio"
                          value="male"
                          defaultChecked={
                            user?.gender === "male" ? true : false
                          }
                          {...register("gender")}
                        />
                        <span>Male</span>
                      </label>
                      <label>
                        <input
                          name="gender"
                          type="radio"
                          value="female"
                          defaultChecked={
                            user?.gender === "female" ? true : false
                          }
                          {...register("gender")}
                        />
                        <span>Female</span>
                      </label>
                    </form>
                  ) : (
                    <span>{user?.gender}</span>
                  )}
                </div>
                <div className="profile-content_infor_item">
                  <label>Date of birth</label>
                  {updateProfile ? (
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      className="date"
                    >
                      <DatePicker
                        className="input"
                        openTo="day"
                        views={["day", "month", "year"]}
                        {...register("dateOfBirth")}
                        renderInput={(params) => <TextField {...params} />}
                        value={datePicker || new Date(user?.dateOfBirth)}
                        onChange={(newValue) => {
                          setDatePicker(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <span>
                      {user?.dateOfBirth
                        ? new Date(user?.dateOfBirth).toLocaleDateString(
                            "en-US"
                          )
                        : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          }
          actions={
            !friend ? (
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
                  <div
                    className="update-profile-btn_item cancel"
                    onClick={() => setUpdateProfile(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="update-profile-btn_item save"
                    onClick={SaveProfile}
                  >
                    Save
                  </div>
                </div>
              )
            ) : (
              <div className="block-messgae" onClick={BlockUser}>
                <BlockIcon />
                <span>Block message</span>
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
      </form>
    </div>
  );
};

export default Profile;
