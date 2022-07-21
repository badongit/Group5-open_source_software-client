import SocketService from "@socket/service";
import SocketContext from "@socket/SocketReactContext";
import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import "./assets/scss/index.scss";
import routes from "./routes";

function App() {
  const elements = useRoutes(routes);
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
<<<<<<< HEAD
      <div className="app">{elements}</div>
=======
      <div className="app">
        <RouteApp />
      </div>
>>>>>>> 7b77673 (create base ui homepage)
    </SocketContext.Provider>
  );
}

export default App;
