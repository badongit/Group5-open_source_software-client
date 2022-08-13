import React from "react";
import { Menu, MenuItem } from "@mui/material";

export default function CustomMenu({ menuAnchorEl, isOpen, listMenu }) {
  return (
    <Menu
      anchorEl={menuAnchorEl}
      id="basic-menu"
      open={isOpen}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.1))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
		>
			{
				listMenu.map((item, index) => {
					return (
						<MenuItem key={index} onClick={item.handleClick}>{item.text}</MenuItem>
					)
				})
			}
      
    </Menu>
  );
}
