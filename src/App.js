import Home from "@pages/Home";
import SocketService from "@socket/service";
import SocketContext from "@socket/SocketReactContext";
import { useState } from "react";
import "./App.css";
import "./assets/scss/index.scss";
import RouteApp from "./router/Routes";

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
        <RouteApp />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
