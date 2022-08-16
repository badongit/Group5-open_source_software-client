import { config } from "@constants/config";
import messageServices from "@services/message.services";
import { useCallback, useEffect, useRef, useState } from "react";

const useMessages = () => {
  const [listMessage, setListMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    next: {
      startIndex: 0,
      limit: 0,
    },
  });
  const [conditions, setConditions] = useState({
    startIndex: 0,
    limit: config.LIMIT,
  });
  const observer = useRef();
  const lastMessageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.next) {
          setConditions((prev) => ({ ...prev, ...pagination.next }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, pagination.next]
  );

  useEffect(() => {
    setPagination({ total: 0, next: { startIndex: 0, limit: 0 } });
  }, [currentConversation]);

  useEffect(() => {
    if (currentConversation && conditions) {
      const getMessages = async () => {
        setLoading(true);
        const response = await messageServices.getMessages(
          currentConversation,
          conditions
        );
        if (response?.success) {
          if (conditions.startIndex > 0) {
            setListMessage((prev) => [...prev, ...response?.data?.messages]);
          } else {
            setListMessage(response?.data?.messages);
          }
          setPagination(response?.pagination);
        }
        setLoading(false);
      };
      getMessages();
    }
  }, [currentConversation, conditions]);

  const nextPagination = useCallback(() => {
    if (pagination.next) {
      setPagination((prev) => {
        return {
          ...prev,
          total: prev.total + 1,
          next: {
            ...prev.next,
            startIndex: prev.next.startIndex + 1,
          },
        };
      });
    }
  }, [pagination.next]);

  const newListMessageAfterNextPage = useCallback(
    (message) => {
      if (message) {
        setListMessage((prev) => {
          nextPagination();
          return [message].concat(prev);
        });
      }
    },
    [nextPagination]
  );

  return {
    loading,
    listMessage,
    setListMessage,
    setCurrentConversation,
    setConditions,
    nextPagination,
    lastMessageRef,
    newListMessageAfterNextPage,
  };
};
export default useMessages;
