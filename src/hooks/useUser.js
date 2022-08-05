import userServices from "@services/user.services";
import { useCallback, useEffect, useState } from "react";

const useUser = () => {
  const userId = "62cc48b9fcba316c5751a890";
  const [listUser, setListUser] = useState([]);
	const [loading, setLoading] = useState(false);

	const initialConditions = {
    startIndex: 0,
    limit: 10,
    keyword: "",
    "_id[nin]": userId,
  };
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
