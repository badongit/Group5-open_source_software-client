import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import FolderSharedSharpIcon from "@mui/icons-material/FolderSharedSharp";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogoutAction } from "@store/auth/auth.action";

export default function UserSetting({ data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile, setmyProfile] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setmyProfile(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.removeItem(global.ACCESS_TOKEN);
    sessionStorage.removeItem(global.REFRESH_TOKEN);
    dispatch(authLogoutAction());
    navigate("/auth/login");
  }

  return (
    <div>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img src={data.avatarLink} alt={data.displayname} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
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
            },
          }}
          transformOrigin={{ horizontal: "bottom", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar src={data.avatarLink} alt={data.displayname}></Avatar>{" "}
            {data.displayname}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setmyProfile(true)}>
            <ListItemIcon>
              <FolderSharedSharpIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      </React.Fragment>
      {myProfile && (
        <Profile openMyProfile={myProfile} friend={false} dataUser={data} />
      )}
    </div>
  );
}
