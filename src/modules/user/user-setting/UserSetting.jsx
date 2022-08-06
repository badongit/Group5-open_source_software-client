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

var data = {
  fullname: "Nguyễn Thị Thu Hường",
  urlAvatar:
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/92926338_1297031413839722_1100427465127362560_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=Ohb_epytZ1gAX8UF1lO&_nc_ht=scontent.fhan17-1.fna&oh=00_AT-tRolfJFNdNVCj5mRNdhpifGMV-6I9dvm6n4_QhUojEA&oe=6315C63A",
  urlBackground:
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/143067694_1534948250048036_5415654449418566213_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=19026a&_nc_ohc=EBPbxCMR8CAAX-0P_oO&_nc_ht=scontent.fhan17-1.fna&oh=00_AT_pVopQAc5vcJai5S0vPZ2UJdNVW_G8sGBeWdRyKH5CMg&oe=63121328",
  birthday: "25/04/2001",
  address: "Hà Nam",
  phoneNumber: "huongntt",
  gender: "Female",
};

export default function UserSetting(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile, setmyProfile] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setmyProfile(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
              <img src={props.src} alt={props.alt} />
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
            <Avatar src={props.src} alt={props.alt}></Avatar> {data.fullname}
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
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      </React.Fragment>
      {myProfile && <Profile openMyProfile={myProfile} data={data} />}
    </div>
  );
}
