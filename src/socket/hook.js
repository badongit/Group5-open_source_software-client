import { useContext, useEffect } from "react";
import io from "socket.io-client";
import { config, global } from "@constants/index";
import SocketReactContext from "./SocketReactContext";

export const useAuthenticatedSocket = () => {
  const { ctxSetSocket, socket, socketService } =
    useContext(SocketReactContext);
  const token =
    window.sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");
  // const refreshToken =
  //   window.sessionStorage.getItem(global.REFRESH_TOKEN) ||
  //   localStorage.getItem(global.REFRESH_TOKEN);

  useEffect(() => {
    if (!socket && token) {
      const newSocket = io(process.env.REACT_APP_SOCKETIO_URI, {
        auth: {
          token,
        },
        transports: ["websocket"],
      });

      console.log(`socket connect`);
      ctxSetSocket(newSocket);
      socketService.setSocket(newSocket);
    }
  }, [socket, ctxSetSocket, token, socketService]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on(SocketEventEnum.CONNECT_ERROR, async (error) => {
  //       if (error.message === "jwt expired") {
  //         const getAccessToken = await authServices.refreshToken(refreshToken);
  //         const { accessToken } = getAccessToken.data;

  //         if (accessToken) {
  //           setAuthToken(accessToken);
  //           if (window.sessionStorage.getItem(global.REFRESH_TOKEN)) {
  //             window.sessionStorage.setItem(global.ACCESS_TOKEN, accessToken);
  //           } else {
  //             localStorage.setItem(global.ACCESS_TOKEN, accessToken);
  //           }
  //         }
  //         socket.auth.token = accessToken;
  //       }
  //       socket.connect();

  //       console.log(`Error: ${error.message}`);
  //     });

  //     socket.on(SocketEventEnum.ERROR, (error) => {
  //       console.log(`Error: ${error.message}`);
  //     });
  //   }

  //   return () => {
  //     socketService.destroyListeners([
  //       SocketEventEnum.ERROR,
  //       SocketEventEnum.CONNECT_ERROR,
  //     ]);
  //   };
  // }, [socket, refreshToken, socketService]);

  return { socket, ctxSetSocket, socketService };
};
