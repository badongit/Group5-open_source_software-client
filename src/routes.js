import CallVideo from "@modules/message/call-video/CallVideo";
import Login from "@pages/Login";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import RouteApp from "./router/Routes";

const routes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RouteApp />,
    children: [
      { path: "/", element: <Home /> },
      { path: "friends", element: <Friends /> },
      { path: "settings", element: <Settings /> },
      { path: "video-call/:id", element: <CallVideo /> },
    ],
  },
];
export default routes;
