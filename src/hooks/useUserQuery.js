import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAuthenticatedAction, authSetDataAction } from "@store/auth/auth.action";
import authServices from "@services/auth.services";
import { isEmpty } from "lodash";

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
      authServices.getProfile()
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
