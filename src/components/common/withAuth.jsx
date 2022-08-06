import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  const mapState = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.data.user
  });

  return (props) => {
    const { isAuthenticated, user } = useSelector(mapState);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated && user) {
        navigate("/");
      }
    }, [isAuthenticated, navigate, user]);

    return <Component {...props} />;
  };
};

export default withAuth;