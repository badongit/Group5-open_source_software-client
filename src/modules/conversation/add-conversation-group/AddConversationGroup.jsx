import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Radio } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import Input from "@mui/material/Input";
import React, { useCallback, useEffect, useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useUser from "@hooks/useUser";
import { useAuthenticatedSocket } from "@socket/hook";

const AddConversationGroup = ({ Show, onCancel }) => {
  const { socket, socketService } = useAuthenticatedSocket();
  const { listUser, handleSearchUser } = useUser();
  const [ltUser, setLtUser] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [keySearch, setKeySearch] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setLtUser(listUser);
  }, [listUser]);

  console.log(ltUser);
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
    console.log(e.target.files[0]);
  };

  const SearchUser = (key) => {
    setKeySearch(key.target.value);
    handleSearchUser(key.target.value);
  };

  const handleRenameGroup = useCallback(
    (members) => {
      if (socket) {
        socketService.clientCreateConversation({
          members,
          type: "group",
          title,
        });
      }
    },
    [socket, socketService, title]
  );

  const SaveGroup = () => {
    // clientCreateConversation

    const members = userSelected.map((item) => item._id);
    if (members.length >= 2) {
      const createConversation = async () => {
        if (socket) {
          const res = await socketService.clientCreateConversation({
            members,
            type: "group",
            title,
          });
          console.log(res);
          socketService.clientGetConversations();
        }
      };
      createConversation();
    }
    onCancel();

    // if (!fileUpload) {
    //   return;
    // }
    // const form = new FormData();
    // form.append("avatar_group", fileUpload);
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
                <Input
                  fullWidth={true}
                  placeholder={"Enter group name..."}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
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
                  Đã chọn<span>{userSelected.length}/20</span>
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
