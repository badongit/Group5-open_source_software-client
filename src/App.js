import { UploadAvatar } from "@components/upload";
import Home from "@pages/Home";
import SocketService from "@socket/service";
import SocketContext from "@socket/SocketReactContext";
import { useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(() => null);
  const [socketService, setSocketService] = useState(() => new SocketService());

  return (
    <SocketContext.Provider
      value={{
        socket,
        ctxSetSocket: setSocket,
        socketService,
        ctxSetSocketService: setSocketService,
      }}
    >
      <div className="app">
        <Home />
        <UploadAvatar type="file" />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
