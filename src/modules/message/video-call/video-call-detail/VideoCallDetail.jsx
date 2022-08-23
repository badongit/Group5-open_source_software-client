import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { IconButton, Typography } from "@mui/material";
import {
  Call,
  Mic,
  MicOff,
  Phone,
  Videocam,
  VideocamOff,
} from "@mui/icons-material";
import { Peer } from "peerjs";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useAuthenticatedSocket } from "@socket/hook";

export default function VideoCallDetail(props) {
  const {
    openVideoCallDetail,
    setOpenVideoCallDetail,
    open,
    setOpen,
    another,
    peerId,
  } = props;
  const user = useCurrentUser();
  const { socket, socketService } = useAuthenticatedSocket();
  const [stream, setStream] = useState();
  const [camStatus, setCamStatus] = useState(true);
  const [micStatus, setMicStatus] = useState(true);
  const [peer] = useState(new Peer());
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    peer.on("open", (id) => {
      if (another) {
        const getUserMedia = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            setStream(stream);
            myVideo.current.srcObject = stream;
          } catch (err) {
            console.log(err);
          }
        };
        getUserMedia();

        socketService.clientSendUserId({
          userId: user?._id,
          another: another,
          PeerId: id,
        });
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            myVideo.current.srcObject = stream;
            const call = peer.call(peerId, stream);
            call.on("stream", function (remoteStream) {
              console.log("remoteStream", remoteStream);
              userVideo.current.srcObject = remoteStream;
            });
          });
      }
    });
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    peer.on("call", function (call) {
      getUserMedia({ video: true, audio: true }, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on("stream", function (remoteStream) {
          userVideo.current.srcObject = remoteStream;
        });
      });
    });
  }, [socket, socketService, peer, another, user?._id, peerId]);

  const handleCamOff = () => {
    navigator.mediaDevices
      .getUserMedia({ video: !camStatus, audio: micStatus })
      .then((stream) => {
        setStream(stream);
        setCamStatus(!camStatus);
        myVideo.current.srcObject = stream;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMicOff = () => {
    navigator.mediaDevices
      .getUserMedia({ video: camStatus, audio: !micStatus })
      .then((stream) => {
        setMicStatus(!micStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLeaveCall = () => {
    // stream.getVideoTracks()[0].stop();
    // stream.getAudioTracks()[0].stop();
    // myVideo.current.src = "";
    if (openVideoCallDetail) {
      setOpenVideoCallDetail(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <CustomDialog
        open={openVideoCallDetail || open}
        customClassNameDialog="video-call-detail"
        title={
          <>
            <Typography>Min Min calling...</Typography>
          </>
        }
        content={
          <>
            <div className="video-call-detail__main">
              <div className="video-call-detail__main-item">
                <div className="video">
                  <video playsInline ref={userVideo} autoPlay />
                </div>
              </div>
              <div className="video-call-detail__main-item">
                <div className="video">
                  {<video playsInline muted ref={myVideo} autoPlay />}
                </div>
              </div>
            </div>
            <div className="video-call-detail__control">
              {stream && (
                <div className="video-control__btn mic-btn">
                  <IconButton onClick={handleMicOff}>
                    {micStatus ? (
                      <Mic color="primary" />
                    ) : (
                      <MicOff color="disabled" />
                    )}
                  </IconButton>
                </div>
              )}
              <div className="video-control__btn end-call-btn">
                <IconButton onClick={handleLeaveCall}>
                  <Call color="error" />
                </IconButton>
              </div>
              {stream && (
                <div className="video-control__btn cam-btn">
                  <IconButton onClick={handleCamOff}>
                    {camStatus ? (
                      <Videocam color="primary" />
                    ) : (
                      <VideocamOff color="disabled" />
                    )}
                  </IconButton>
                </div>
              )}
            </div>
          </>
        }
      />
    </div>
  );
}
