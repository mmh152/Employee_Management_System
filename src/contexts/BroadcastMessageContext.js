import React, { createContext, useState, useCallback } from "react";
import { sendBroadcastMessage, getBroadcastMessages } from "../services/api";

export const BroadcastMessageContext = createContext();

const BroadcastMessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchBroadcastMessages = useCallback(async () => {
    try {
      const data = await getBroadcastMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch broadcast messages", error);
    }
  }, []);

  const sendMessage = useCallback(
    async (message) => {
      try {
        await sendBroadcastMessage(message);
        fetchBroadcastMessages();
      } catch (error) {
        console.error("Failed to send broadcast message", error);
      }
    },
    [fetchBroadcastMessages]
  );

  return (
    <BroadcastMessageContext.Provider
      value={{
        messages,
        fetchBroadcastMessages,
        sendBroadcastMessage: sendMessage,
      }}
    >
      {children}
    </BroadcastMessageContext.Provider>
  );
};

export default BroadcastMessageProvider;
