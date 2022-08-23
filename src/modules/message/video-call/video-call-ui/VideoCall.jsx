import { AvatarOnline } from "@components/avatar/AvatarOnline";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { Close, VideoCameraBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import VideoCallDetail from "../video-call-detail/VideoCallDetail";

export default function VideoCall(props) {
  const { open, setOpen, peerId } = props;
  const user = useCurrentUser();
  const [openVideoCallDetail, setOpenVideoCallDetail] = useState(false);

  return (
    <div>
      <CustomDialog
        open={open}
        title={
          <AvatarOnline src={user?.avatarLink} size="normal" dot={false} />
        }
        className="video-call"
        iconBtn={
          <div className="video-call__close">
            <IconButton size="small" onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </div>
        }
        content={
          <div className="video-call__main">
            <Typography variant="h5" fontWeight={600}>
              {user?.displayname} <br /> is calling you...
            </Typography>
            <Typography variant="body1" color="GrayText" mt={1}>
              The call will start as soon as you acept
            </Typography>
          </div>
        }
        actions={
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <IconButton
                size="medium"
                className="video-call__icon-close"
                onClick={() => setOpen(false)}
              >
                <Close />
              </IconButton>
              <Typography variant="body2" color="GrayText" mt={1}>
                Refuse
              </Typography>
            </Box>
            <Box ml={5}>
              <IconButton
                size="medium"
                className="video-call__icon-accept"
                onClick={() => setOpenVideoCallDetail(true)}
              >
                <VideoCameraBack />
              </IconButton>
              <Typography variant="body2" color="GrayText" mt={1}>
                Accept
              </Typography>
            </Box>
          </Box>
        }
      />
      {openVideoCallDetail && (
        <VideoCallDetail
          openVideoCallDetail={openVideoCallDetail}
          setOpenVideoCallDetail={setOpenVideoCallDetail}
          peerId={peerId}
        />
      )}
    </div>
  );
}
