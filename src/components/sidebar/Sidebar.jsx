<<<<<<< HEAD
//import UserSetting from "@modules/user/user-setting/UserSetting";
=======
import { useCurrentUser } from "@hooks/useCurrentUser";
<<<<<<< HEAD
>>>>>>> 2adbced76466837581003b0924b66582c7fde36b
=======
import UserSetting from "@modules/user/user-setting/UserSetting";
>>>>>>> 17c73a1d73212eaa6f8903dcae3cc385aef19c8c
import React from "react";
import { useNavigate } from "react-router-dom";
import { sidebarDataBottom, sidebarDataTop } from "./sidebarData";

function Sidebar(props) {
  const user = useCurrentUser();
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
<<<<<<< HEAD
<<<<<<< HEAD
        {/* <UserSetting
          src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/3/10/887631/Tieu-Chien-1.jpg"
          alt="avt"
        />   */}
=======
        <img
          src={user?.avatarLink}
          alt=""
        />
>>>>>>> 2adbced76466837581003b0924b66582c7fde36b
=======
        <UserSetting data={user} />
>>>>>>> 17c73a1d73212eaa6f8903dcae3cc385aef19c8c
      </div>
    </div>
  );
}

export default Sidebar;
