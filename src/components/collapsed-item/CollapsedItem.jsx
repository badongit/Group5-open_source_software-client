import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AvatarOnline } from "@components/avatar/AvatarOnline";

export default function CollapsedItem({ dataCollapsed, handleClickItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ListItem button key={dataCollapsed.id} onClick={handleClick}>
        <ListItemText primary={dataCollapsed.name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="li" disablePadding key={dataCollapsed.id} sx={{ backgroundColor: "rgb(247, 247, 247)"}}>
          {dataCollapsed.results.map((item) => {
            return (
							<ListItem button key={item.id}  onClick={item.isLeave ? handleClickItem : "" }>
								{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
								{item.linkAvatar && (
									<ListItemIcon>
										<AvatarOnline
											src={item.linkAvatar}
											dot={false}
											size="smaller"
										/>
									</ListItemIcon>
								)}
                <ListItemText key={item.id} primary={item.title} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </div>
  );
}