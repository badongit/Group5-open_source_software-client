const AuthActionEnum = {
  LOADING: "auth/LOADING",
  STOP_LOADING: "auth/STOP_LOADING",
  SUBMITTING: "auth/SUBMITTING",
  STOP_SUBMITTING: "auth/STOP_SUBMITTING",
  AUTHENTICATED: "auth/AUTHENTICATED",
  NOT_AUTHENTICATED: "auth/NOT_AUTHENTICATED",
  SET_DATA: "auth/SET_DATA",
  LOG_OUT: "auth/LOG_OUT",
};

export const authLoadingAction = () => ({
  type: AuthActionEnum.LOADING,
});

export const authStopLoadingAction = () => ({
  type: AuthActionEnum.STOP_LOADING,
});

export const authSubmittingAction = () => ({
  type: AuthActionEnum.SUBMITTING,
});

export const authStopSubmittingAction = () => ({
  type: AuthActionEnum.STOP_SUBMITTING,
});

export const authAuthenticatedAction = () => ({
  type: AuthActionEnum.AUTHENTICATED,
});

export const authNotAuthenticatedAction = () => ({
  type: AuthActionEnum.NOT_AUTHENTICATED,
});

export const authSetDataAction = (data) => ({
  type: AuthActionEnum.SET_DATA,
  payload: { data },
});

export const authLogoutAction = () => ({
  type: AuthActionEnum.LOG_OUT,
});

export default AuthActionEnum;
