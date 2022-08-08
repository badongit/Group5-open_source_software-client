import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Radio } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
var users = [
  {
    _id: "1",
    name: "Nguyễn Văn Dương",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "2",
    name: "test 2",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "3",
    name: "test 3",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "4",
    name: "test 4",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "5",
    name: "test 5",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "6",
    name: "test 4",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "7",
    name: "test 5",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "8",
    name: "test 4",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
  {
    _id: "9",
    name: "test 5",
    url: "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5qzFLJ6T6JYAX_PBJZB&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uA71jznEKlQGWHhWCdDc_hY37gWIP3DvXYFAXLbAfow&oe=62F247F6",
  },
];

const AddConversationGroup = ({ Show, onCancel }) => {
  const [ltUser, setLtUser] = useState(users);
  const [userSelected, setUserSelected] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);

  const removeUser = (user) => {
    setUserSelected(
      userSelected.filter(function (item) {
        return item._id !== user._id;
      })
    );
    ltUser.unshift(user);
    setLtUser(ltUser);
  };
  const addUserSelected = (user) => {
    userSelected.unshift(user);
    setUserSelected(userSelected);
    // setLtUser(
    //   ltUser.filter(function (item) {
    //     return item._id !== user._id;
    //   })
    // );
  };

  const handleChangeFile = (e) => {
    setFileUpload(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const SaveGroup = () => {
    if (!fileUpload) {
      return;
    }
    const form = new FormData();
    form.append("avatar_group", fileUpload);
  };
  return (
    <div className="cv-gr">
      <CustomDialog
        open={Show}
        title="Tạo nhóm"
        className="custom-dialog__title conversation-group"
        iconBtn={
          <div className="custom-dialog__title-icon">
            <IconButton onClick={onCancel}>
              <Close className="conversation-group_close" />
            </IconButton>
          </div>
        }
        content={
          <div className="conversation-group_content">
            <div className="content_header">
              <div className="avt">
                <label htmlFor="input-upload">
                  {fileUpload == null ? (
                    <CameraEnhanceIcon />
                  ) : (
                    <img
                      src={fileUpload && URL.createObjectURL(fileUpload)}
                      alt=""
                    />
                  )}
                </label>
                <input
                  accept="image/*"
                  className="upload-image__input-upload"
                  id="input-upload"
                  type="file"
                  onChange={handleChangeFile}
                />
              </div>
              <div className="name-group">
                <Input fullWidth={true} placeholder={"Enter group name..."} />
              </div>
            </div>
            <div className="add-friend-title">Add you to the group</div>
            <div className="search">
              <PersonSearchIcon className="icon" />
              <input type={"text"} placeholder={"Enter name ..."} />
            </div>
            <h6>Tất cả</h6>
            <Divider style={{ margin: "5px 0px" }} />
            <div className="select">
              <div className="select_ing-users">
                {ltUser.map((item) => {
                  return (
                    <div
                      className="user-item"
                      onClick={() => addUserSelected(item)}
                    >
                      <div className="container">
                        <Radio value={item.name} label={item.name} id={item._id} className="icon"/>
                        <div className="avt-and-name">
                          <img src={item.url} alt="avt" />
                          <span>{item.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className={
                  "select_ed-users " + (userSelected.length > 0 ? "action" : "")
                }
              >
                <div className="title">
                  Đã chọn<span>{userSelected.length}/100</span>
                </div>
                {userSelected.map((item) => {
                  return (
                    <div className="select_ed-users_item">
                      <img src={item.url} alt="avt" />
                      <span>{item.name}</span>
                      <Close
                        className="close"
                        onClick={() => removeUser(item)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        }
        actions={
          <Box className="action-btn">
            <Button
              size="small"
              variant="contained"
              color="inherit"
              sx={{ marginRight: "10px" }}
              onClick={onCancel}
            >
              cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={SaveGroup}
              className={
                "btn-create-group " + (userSelected.length > 0 ? "action" : "")
              }
            >
              leave
            </Button>
          </Box>
        }
      />
    </div>
  );
};

export default AddConversationGroup;
