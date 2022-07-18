import AuthActionEnum from "./auth.action";

const initialState = {
  isLoading: true,
  isSubmitting: false,
  isAuthenticated: false,
  data: {
    user: {},
  },
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionEnum.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionEnum.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case AuthActionEnum.SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };

    case AuthActionEnum.STOP_SUBMITTING:
      return {
        ...state,
        isSubmitting: false,
      };
    case AuthActionEnum.AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };

    case AuthActionEnum.NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };

    case AuthActionEnum.SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
      };

    case AuthActionEnum.LOG_OUT:
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
};

export default authReducer;
