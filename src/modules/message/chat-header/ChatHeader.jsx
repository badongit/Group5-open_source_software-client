import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { Error } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function ChatHeader(props) {
	const { name, onToggleMessageDetail } = props;

	return (
		<div className="chat-header">
			<div className="chat-header__left">
				<AvatarOnline
					src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
          dot={false}
					size="small"
				/>
				<p className="chat-header__left-name">{name}</p>
			</div>
			<div className="chat-header__right">
				<IconButton onClick={onToggleMessageDetail}>
					<Error color="primary" />
				</IconButton>
			</div>
		</div>
	)
}
