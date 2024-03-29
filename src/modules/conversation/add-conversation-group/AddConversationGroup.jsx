import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useUser from "@hooks/useUser";

const AddConversationGroup = ({ Show, onCancel, handleCreateConversation, isAddPeople, conversationDetail, handleAddNewMember }) => {
  const idMembers = conversationDetail?.members.map(m => m._id);
  const { listUser, handleSearchUser } = useUser(!isAddPeople ? null : idMembers);
  const [ltUser, setLtUser] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [keySearch, setKeySearch] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const ltID = userSelected.map((item) => item._id);
    setLtUser(
      listUser.filter((item) => {
        return !ltID.includes(item._id);
      })
    );
  }, [listUser, userSelected]);

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
    setLtUser(
      ltUser.filter(function (item) {
        return item._id !== user._id;
      })
    );
  };

  const handleChangeFile = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const SearchUser = (key) => {
    setKeySearch(key.target.value);
    handleSearchUser(key.target.value);
  };

  const SaveGroup = () => {
    const members = userSelected.map((item) => item._id);
    if (members.length >= 2 && title) {
      handleCreateConversation({
        members,
        type: "group",
        title,
      });
      onCancel();
    }
  };

  const onAdd = () => {
    const members = userSelected.map((item) => item._id);
    if (members.length > 0 && conversationDetail?._id) {
      handleAddNewMember({
        conversationId: conversationDetail._id,
        members,
      });
      onCancel();
    }
  }

  return (
    <div className="cv-gr">
      <CustomDialog
        open={Show}
        title={!isAddPeople ? "Create group" : "Add member"}
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
            {!isAddPeople && (
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
                  <Input
                    fullWidth={true}
                    placeholder={"Enter group name..."}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="add-friend-title">Add you to the group</div>
            <div className="search">
              <PersonSearchIcon className="icon" />
              <input
                type={"text"}
                placeholder={"Enter name ..."}
                value={keySearch}
                onChange={(e) => SearchUser(e)}
              />
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
                        <AddCircleIcon
                          value={item.displayname}
                          label={item.displayname}
                          id={item._id}
                          className="icon"
                        />
                        <div className="avt-and-name">
                          <img src={item.avatarLink} alt="avt" />
                          <span>{item.displayname}</span>
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
                  Selected<span>{userSelected.length}/30</span>
                </div>
                {userSelected.map((item) => {
                  return (
                    <div className="select_ed-users_item">
                      <img src={item.avatarLink} alt="avt" />
                      <span>{item.displayname}</span>
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
              onClick={!isAddPeople ? SaveGroup : onAdd}
              className={
                "btn-create-group " +
                ((userSelected.length > 1 && title) || (userSelected.length > 0 && isAddPeople) ? "action" : "")
              }
            >
              {!isAddPeople ? "Create" : "Add"}
            </Button>
          </Box>
        }
      />
    </div>
  );
};

export default AddConversationGroup;
