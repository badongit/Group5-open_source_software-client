import Sidebar from "@components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function RouteApp() {
  return (
    <div className="routes">
      <Sidebar />
      <div className="routes-content">
        <Outlet />
      </div>
    </div>
  );
}

export default RouteApp;
