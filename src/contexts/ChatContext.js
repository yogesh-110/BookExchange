import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    currentUser: currentUser ? currentUser.uid : null,
    user: {},
    chatId: null,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          ...state,
          user: action.payload,
          currentUser: currentUser ? currentUser.uid : null,
          chatId:
            currentUser &&
            action.payload &&
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case 'UPDATE_CHAT':
        return {
          ...state,
          chatId: action.payload.chatId,
          user: action.payload.user,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
