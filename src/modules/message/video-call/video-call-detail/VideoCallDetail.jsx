import React, { useEffect, useRef, useState } from "react";
import { CustomDialog } from "@components/custom-dialog/CustomDialog";
import { IconButton, Typography } from "@mui/material";
import { Call, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Peer } from "peerjs";
import { useCurrentUser } from "@hooks/useCurrentUser";

export default function VideoCallDetail(props) {
  const {
    openVideoCallDetail,
    setOpenVideoCallDetail,
    open,
    setOpen,
    otherPeople,
  } = props;
  const user = useCurrentUser();
  const [stream, setStream] = useState();
  const [camStatus, setCamStatus] = useState(true);
  const [micStatus, setMicStatus] = useState(true);
  const [peer, setPeer] = useState(new Peer(null));
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    setPeer(user?._id);
  }, [user]);

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        const call = peer.call(otherPeople?._id, stream);
        call.on("stream", (remoteStream) => {
          console.log("remoteStream", remoteStream);
          userVideo.current.srcObject = remoteStream;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [peer, otherPeople]);

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

  // peer.on("call", (call) => {
  //   navigator.mediaDevices.getUserMedia(
  //     { video: true, audio: true },
  //     (stream) => {
  //       setStream(stream);
  //       myVideo.current.srcObject = stream;
  //       call.answer(stream);
  //       call.on("stream", (remoteStream) => {
  //         userVideo.current.srcObject = remoteStream;
  //       });
  //       setOpenVideoCallDetail(true);
  //     },
  //     (err) => {
  //       console.error("Failed to get local stream", err);
  //     }
  //   );
  // });

  const handleLeaveCall = () => {
    stream.getVideoTracks()[0].stop();
    stream.getAudioTracks()[0].stop();
    myVideo.current.src = "";
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
                  {stream && <video playsInline muted ref={myVideo} autoPlay />}
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
