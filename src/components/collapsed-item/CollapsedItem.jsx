import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AvatarOnline } from "@components/avatar/AvatarOnline";

export default function CollapsedItem({ id, name, dataCollapsed, handleClickItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ListItem button key={id} onClick={handleClick}>
        <ListItemText primary={name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="li"
          disablePadding
          key={id}
          sx={{ backgroundColor: "rgb(247, 247, 247)" }}
        >
          {dataCollapsed.map((item) => {
            return (
              <ListItem
                button
                key={item.id || item._id}
                onClick={item.isLeave ? handleClickItem : null}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {item.avatarLink && (
                  <ListItemIcon>
                    <AvatarOnline
                      src={item.avatarLink}
                      dot={false}
                      size="smaller"
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  key={item.id || item.id}
                  primary={item.title ? item.title : item.displayname}
                />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </div>
  );
}
