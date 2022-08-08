//import UserSetting from "@modules/user/user-setting/UserSetting";
import React from "react";
import { useNavigate } from "react-router-dom";
import { sidebarDataBottom, sidebarDataTop } from "./sidebarData";

function Sidebar(props) {
  const navigate = useNavigate();
  const activeTop = sidebarDataTop.findIndex(
    (item) => item.path === window.location.pathname
  );
  const activeBot = sidebarDataBottom.findIndex(
    (item) => item.path === window.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {sidebarDataTop.map((item, index) => {
          return (
            <div
              key={index}
              className={`sidebar-icon ${activeTop === index ? "active" : ""}`}
              onClick={() => navigate(`${item.path}`)}
            >
              {item.icon}
            </div>
          );
        })}
      </div>
      <div className="sidebar-bottom">
        {sidebarDataBottom.map((item, index) => {
          return (
            <div
              key={index}
              className={`sidebar-icon ${activeBot === index ? "active" : ""}`}
              onClick={() => navigate(`${item.path}`)}
            >
              {item.icon}
            </div>
          );
        })}
      </div>
      <div className="sidebar-info">
        {/* <UserSetting
          src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
          alt="avt"
        />   */}
      </div>
    </div>
  );
}

export default Sidebar;
