import userServices from "@services/user.services";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";

const useUser = (usersRemove) => {
  const user = useCurrentUser();
  const [listUser, setListUser] = useState([]);
	const [loading, setLoading] = useState(false);

	const initialConditions = {
    startIndex: 0,
    limit: 10,
    keyword: "",
    "_id[nin]": [user?._id]
  };
  
  if (usersRemove) {
    initialConditions["_id[nin]"] = initialConditions["_id[nin]"].concat(usersRemove);
  }

	const [conditions, setConditions] = useState(initialConditions);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
			const response = await userServices.getAllUser(conditions);
			
      if (response?.success) {
        setListUser(response?.data?.users);
      }
      setLoading(false);
    };

    getUsers();
	}, [conditions]);
	
	const handleSearchUser = useCallback((keyword) => {
		setConditions((prev) => ({ ...prev, keyword }));
	}, [])

	const resetConditions = () => {
		setConditions(initialConditions);
	}
	
  return {
    listUser,
		loading,
		handleSearchUser,
		resetConditions
  };
};

export default useUser;
