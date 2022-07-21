import React from "react";
import Sidebar from "@components/sidebar/Sidebar";
import Home from "@pages/Home";
import Settings from "@pages/Settings";
import Friends from "@pages/Friends";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function RouteApp() {
  return (
    <BrowserRouter>
      <div className="routes">
        <Sidebar />
        <div className="routes-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default RouteApp;
