import React, { useCallback, useEffect, useState } from "react";
import {
  CameraAlt,
  Close,
  Edit,
  Image,
  InsertDriveFileOutlined,
  Logout,
  MoreHoriz,
  OndemandVideo,
  PeopleAlt,
} from "@mui/icons-material";
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import UploadImage from "@components/upload-image/UploadImage";
import { AvatarOnline } from "@components/avatar/AvatarOnline";
import CollapsedItem from "@components/collapsed-item/CollapsedItem";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { Box } from "@mui/system";
import { useCurrentUser } from "@hooks/useCurrentUser";
import InputField from "@components/form-field/InputField";
import { useForm } from "react-hook-form";
import CustomTab from "@components/custom-tab/CustomTab";
import CustomMenu from "@components/custom-menu/CustomMenu";
import conversationServices from "@services/conversation.services";
import { toast } from "react-toastify"
import { useAuthenticatedSocket } from "@socket/hook";
import AddConversationGroup from "@modules/conversation/add-conversation-group/AddConversationGroup";

export default function MessageDetail(props) {
  const { conversation, otherPeople, setToggleMessageDetail, handleRenameGroup, handleUpdateReceiveConversation, handleAddNewMember } = props;
  const user = useCurrentUser();
  const { socket, socketService } = useAuthenticatedSocket();
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [isLeaveGroup, setIsLeaveGroup] = useState(false);
  const [isChangeNameGroup, setIsChangeNameGroup] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuAdminAnchorEl, setMenuAdminAnchorEl] = useState(null);
  const isOpenMenuUser = Boolean(menuAnchorEl);
  const isOpenMenuAdmin = Boolean(menuAdminAnchorEl);
  const [memberGroup, setMemberGroup] = useState(null);
  const [isAddMember, setIsAddMember] = useState(false);
  
  const checkAdmin = conversation?.admin.find(admin => admin?._id === user?._id);

  const defaultValues = {
    title: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: "all",
  });

  let type, title, photoLink, members;
  if (conversation) {
    if (conversation?.type === "group") {
      type = conversation?.type;
      title = conversation?.title;
      photoLink = conversation?.photoLink;
      members = conversation?.members;
    } else if (conversation?.type === "private") {
      const friends = conversation?.members.find(
        (member) => member._id !== user?._id
      );
      type = conversation?.type;
      title = friends?.displayname;
      photoLink = friends?.avatarLink;
    }
  }
  if (otherPeople) {
    title = otherPeople?.displayname;
    photoLink = otherPeople?.avatarLink;
  }

  const handleOpenMenuUser = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenuUser = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenMenuAdmin = (event) => {
    setMenuAdminAnchorEl(event.currentTarget);
  };

  const handleCloseMenuAdmin = () => {
    setMenuAdminAnchorEl(null);
  };

  // role: [members | admin]
  const handleChangeRole = useCallback(async (userId, role) => {
    try {
      if (!userId || !role) return;

      const response = await conversationServices.changeRole({
        conversationId: conversation?._id,
        userId,
        role
      });
      if (response?.success) {
        handleUpdateReceiveConversation(response?.data?.conversation);
        if (role === "admin") {
          toast.success("Add admin successfully!");
        } else {
          toast.success("Remove admin successfully!");
        }
      }
    } catch (error) {
      toast.error("Error");
    }
  }, [conversation, handleUpdateReceiveConversation])
  
  // upload photo
  const handleUploadPhoto = async (formData) => {
    try {
      const response = await conversationServices.uploadPhoto(conversation?._id, formData);
      if (response?.success) {
        toast.success("Update successfully!");
        handleUpdateReceiveConversation(response?.data?.conversation);
      }
    } catch (error) {
      toast.error("Upload photo error.");
    }
  }

  // leave group
  const handleLeaveGroup = useCallback((userId) => {
    if (!userId) return;

    if (socket) {
      socketService.clientLeaveConversation({
        userId,
        conversationId: conversation?._id
      });
    }
  }, [socket, socketService, conversation])

  useEffect(() => {
    if (conversation?.type === "group") {
      setValue("title", conversation?.title);
    }
  }, [setValue, conversation]);

  const onsubmit = (data) => {
    handleRenameGroup(data);
    setIsChangeNameGroup(false);
  };

  return (
    <div className="message-detail">
      <div className="message-detail__top">
        <IconButton onClick={setToggleMessageDetail}>
          <Close />
        </IconButton>
      </div>
      <div className="message-detail__upload">
        <div className="message-detail__upload-avatar">
          <AvatarOnline src={photoLink} dot={false} size="large" />
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
          {title}
        </Typography>
      </div>
      {type === "group" ? (
        <div>
          <UploadImage
            openModalUpload={openModalUpload}
            setOpenModalUpload={setOpenModalUpload}
            onSubmitFile={handleUploadPhoto}
          />
        </div>
      ) : (
        ""
      )}
      <div className="message-detail__list">
        <List component="nav" aria-labelledby="nested-list-subheader">
          {type === "group" ? (
            <CollapsedItem
              id={1}
              name={`Chat members (${members?.length} members)`}
              isShowTab={true}
              tabPanel={
                <CustomTab
                  nameTab={["Members", "Admin"]}
                  contentTab={[
                    <>
                      <List
                        component="li"
                        disablePadding
                        sx={{ backgroundColor: "rgb(247, 247, 247)" }}
                        key={1}
                      >
                        {members?.map((member, index) => {
                          return (
                            <ListItem
                              key={index}
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "#fdfdfd",
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: "50px" }}>
                                <AvatarOnline
                                  src={member?.avatarLink}
                                  dot={false}
                                  size="smaller"
                                />
                              </ListItemIcon>
                              <ListItemText primary={member?.displayname} />
                              {checkAdmin ? (
                                <div
                                  onClick={(event) => {
                                    handleOpenMenuUser(event);
                                    setMemberGroup(member);
                                  }}
                                >
                                  {" "}
                                  <MoreHoriz />{" "}
                                </div>
                              ) : (
                                ""
                              )}
                              {checkAdmin && isOpenMenuUser ? (
                                <CustomMenu
                                  menuAnchorEl={menuAnchorEl}
                                  isOpen={isOpenMenuUser}
                                  listMenu={[
                                    {
                                      text: "Remove from group",
                                      handleClick: () => {
                                        handleLeaveGroup(memberGroup?._id);
                                        handleCloseMenuUser();
                                      },
                                    },
                                    {
                                      text: "Add admin",
                                      handleClick: () => {
                                        handleChangeRole(
                                          memberGroup?._id,
                                          "admin"
                                        );
                                        handleCloseMenuUser();
                                      },
                                    },
                                  ]}
                                />
                              ) : (
                                ""
                              )}
                            </ListItem>
                          );
                        })}
                      </List>
                    </>,
                    <>
                      <List component="li" disablePadding key={2}>
                        {conversation?.admin.map((member, index) => {
                          return (
                            <ListItem
                              key={index}
                              sx={{
                                cursor: "pointer",
                                backgroundColor: "rgb(247, 247, 247)",
                                "&:hover": {
                                  backgroundColor: "#fdfdfd",
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: "50px" }}>
                                <AvatarOnline
                                  src={member?.avatarLink}
                                  dot={false}
                                  size="smaller"
                                />
                              </ListItemIcon>
                              <ListItemText primary={member?.displayname} />
                              {checkAdmin ? (
                                <div
                                  onClick={(event) => {
                                    handleOpenMenuAdmin(event);
                                    setMemberGroup(member);
                                  }}
                                >
                                  <MoreHoriz />
                                </div>
                              ) : (
                                ""
                              )}
                              {checkAdmin && isOpenMenuAdmin ? (
                                <CustomMenu
                                  menuAnchorEl={menuAdminAnchorEl}
                                  isOpen={isOpenMenuAdmin}
                                  listMenu={[
                                    {
                                      text: "Remove from group",
                                      handleClick: () => {
                                        handleLeaveGroup(memberGroup?._id);
                                        handleCloseMenuAdmin();
                                      },
                                    },
                                    {
                                      text: "Remove admin",
                                      handleClick: () => {
                                        handleChangeRole(
                                          memberGroup?._id,
                                          "members"
                                        );
                                        handleCloseMenuAdmin();
                                      },
                                    },
                                  ]}
                                />
                              ) : (
                                ""
                              )}
                            </ListItem>
                          );
                        })}
                      </List>
                    </>,
                  ]}
                />
              }
              dataCollapsed={[]}
            />
          ) : (
            ""
          )}
          {type === "group" ? (
            <CollapsedItem
              id={2}
              name="Customize chat"
              dataCollapsed={[
                {
                  id: 1,
                  title: "Rename the group",
                  icon: <Edit />,
                  isChangeName: true,
                }
              ]}
              handleClickItem={() => setIsChangeNameGroup(true)}
            />
          ) : (
            ""
          )}
          <CollapsedItem
            id={3}
            name="Files media"
            dataCollapsed={[
              { id: 1, title: "Image", icon: <Image /> },
              { id: 2, title: "Video", icon: <OndemandVideo /> },
              { id: 3, title: "File", icon: <InsertDriveFileOutlined /> },
            ]}
          />
          {type === "group" ? (
            <CollapsedItem
              id={4}
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
          {type === "group" ? (
            <CollapsedItem
              id={4}
              name="More"
              dataCollapsed={[
                {
                  id: 1,
                  title: "Add member",
                  icon: <PeopleAlt />,
                  isAddMember: true,
                },
              ]}
              handleClickItem={() => setIsAddMember(true)}
            />
          ) : (
            ""
          )}
        </List>
      </div>
      {/* leave group */}
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
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleLeaveGroup(user?._id);
                  setIsLeaveGroup(false);
                }}
              >
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
      {/* change group name */}
      {isChangeNameGroup && (
        <CustomDialog
          open={isChangeNameGroup}
          title="Rename the group"
          className="custom-dialog__title"
          iconBtn={
            <div className="custom-dialog__title-icon">
              <IconButton onClick={() => setIsChangeNameGroup(false)}>
                <Close />
              </IconButton>
            </div>
          }
          content={
            <>
              <Typography variant="body2" component="div">
                Everyone knows when the chat group name changes.
              </Typography>
              <InputField
                label="Group name"
                name="title"
                control={control}
                rules={{
                  required: { value: true, message: "Group name is required" },
                }}
              />
            </>
          }
          actions={
            <Box>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={!isValid}
                onClick={handleSubmit(onsubmit)}
              >
                save
              </Button>
              <Button
                size="small"
                variant="contained"
                color="inherit"
                sx={{ marginLeft: "10px" }}
                onClick={() => setIsChangeNameGroup(false)}
              >
                cancel
              </Button>
            </Box>
          }
        />
      )}
      {/* add member */}
      {isAddMember && (
        <AddConversationGroup
          Show={isAddMember}
          onCancel={() => setIsAddMember(false)}
          isAddPeople={true}
          conversationDetail={conversation}
          handleAddNewMember={handleAddNewMember}
        />
      )}
    </div>
  );
}
