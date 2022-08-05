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
  fullname : "Nguyễn Văn Dương",
  urlAvatar : "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/294623964_1160711717839762_900680647510478303_n.jpg?stp=cp1_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=b18e-j9hJpEAX86zMDf&_nc_ht=scontent.fhan19-1.fna&oh=00_AT84yw9yWdyqn_GNLpFm_TtvI9I9MB5R_k_rUyqcLsQ0WA&oe=62EC5936",
  urlBackground : "https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/117392494_712743235969948_2757099301110340723_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=ouVksfk9ZAwAX_UMX95&_nc_ht=scontent.fhan19-1.fna&oh=00_AT9-SXBMLY-18YhsTKFC9Vw_O_QAbKZ6pQS-7C9AeCsBbw&oe=630D3B12",
  birthday :"6/7/2001",
  address : "Thanh hóa"
}

export default function UserSetting(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myProfile, setmyProfile] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setmyProfile(false)
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
            Hồ sơ của bạn
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Cài đặt
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      </React.Fragment>
      {
        myProfile &&
        < Profile
          openMyProfile = {myProfile}
          data = {data}
        />
      }
    </div>
  );
}
