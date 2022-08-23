import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAuthenticatedAction, authSetDataAction } from "@store/auth/auth.action";
import authServices from "@services/auth.services";
import { isEmpty } from "lodash";
import { global } from "@constants/global";

export function useUserQuery() {
  const [data, setData] = useState({
    user: null,
    error: null,
    loading: true
  });

  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const refetch = useCallback(async () => {
    setData({
      ...data,
      loading: true
    });

    if (!isEmpty(authState?.data?.user)) {
      setData({
        ...data,
        user: authState.data.user,
        error: null
      });
    } else {
      const remember = JSON.parse(localStorage.getItem('remember'));
      const accessToken = sessionStorage.getItem(global.ACCESS_TOKEN);

      if (remember?.token && !accessToken) {
        await authServices.checkRemember(remember)
          .then(async response => {
            if (response.success) {
              const responseData = response.data;

              sessionStorage.setItem(global.ACCESS_TOKEN, response.data.accessToken);
              sessionStorage.setItem(global.REFRESH_TOKEN, response.data.refreshToken);

              setData({
                ...data,
                user: responseData.user,
                error: null
              });

              await dispatch(authSetDataAction({
                user: responseData.user
              }));

              await dispatch(authAuthenticatedAction());
            }
          })
          .catch(error => {
            setData({
              ...data,
              error: error.message,
              user: null
            });
          })
          .finally(() => {
            setData((data) => ({
              ...data,
              loading: false
            }));
          });
      }

      await authServices.getProfile()
        .then(async response => {
          if (response.success) {
            const user = response.data.user;

            setData({
              ...data,
              user,
              error: null
            });

            await dispatch(authSetDataAction({
              user
            }));

            await dispatch(authAuthenticatedAction());
          }
        })
        .catch(error => {
          setData({
            ...data,
            error: error.message,
            user: null
          });
        })
        .finally(() => {
          setData((data) => ({
            ...data,
            loading: false
          }));
        });
    }
  }, [dispatch, authState.data.user, data]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, refetch };
}
