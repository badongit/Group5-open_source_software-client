import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  Call,
  Mic,
  MicOff,
  Phone,
  Videocam,
  VideocamOff,
} from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

// const socket = io.connect("http://localhost:5000");
function CallVideo() {
  const params = useParams();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [name, setName] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [camStatus, setCamStatus] = useState(true);
  const [micStatus, setMicStatus] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    setIdToCall(params?.id);
  }, [params.id]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((e) => {
        console.log("Tắt mic và audio");
      });

    // socket.on("me", (id) => {
    //   console.log(id);
    //   setMe(id);
    // });

    // socket.on("callUser", (data) => {
    //   setReceivingCall(true);
    //   setCaller(data.from);
    //   setName(data.name);
    //   setCallerSignal(data.signal);
    // });
  }, []);

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

  const handleCallUser = (name, id) => {
    console.log(name, "--", id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("id", id);
      console.log("signal", data);
      // socket.emit("callUser", {
      //   userToCall: id,
      //   signalData: data,
      //   from: me,
      //   name: name,
      // });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    // socket.on("callAccepted", (signal) => {
    //   setCallAccepted(true);
    //   peer.signal(signal);
    // });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      // socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div className="video-call">
      <div className="video-call__top">
        <Box
          sx={{
            width: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="ID to call"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            sx={{ marginLeft: "15px", marginRight: "15px" }}
          />
          <div className="call-button">
            {/* {callAccepted && !callEnded ? (
              <IconButton color="error" className="call-button__icon">
                <Phone />
              </IconButton>
            )  */}
            <IconButton
              color="primary"
              className="call-button__icon"
              aria-label="call"
              onClick={() => handleCallUser(name, idToCall)}
              disabled={!name || !idToCall}
            >
              <Phone />
            </IconButton>
          </div>
        </Box>
        <div className="call-answer">
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                {name} is calling...
              </Typography>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={answerCall}
              >
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <Typography style={{ margin: "0 45px" }}>
        {idToCall && name ? `Calling ${idToCall} ...` : null}
      </Typography>
      <div className="video-call__container">
        <div className="video-call__container-item">
          <div className="video">
            {stream && <video playsInline muted ref={myVideo} autoPlay />}
          </div>
          <div className="video-control">
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
              <IconButton onClick={leaveCall}>
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
        </div>
        <div className="video-call__container-item">
          {callAccepted && !callEnded ? (
            <div className="video">
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CallVideo;
