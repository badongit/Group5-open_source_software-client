import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const withNotAuth = (Component) => {
    const mapState = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.data.user
    });

    return (props) => {
        const {isAuthenticated, user} = useSelector(mapState);
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated || !user) {
                navigate('/auth/login');
            }
        }, [isAuthenticated, navigate, user]);

        return isAuthenticated && <Component {...props} />;
    };
};

export default withNotAuth;
