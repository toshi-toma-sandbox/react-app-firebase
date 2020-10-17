import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

type UserContextType = {
  currentUser: firebase.User | null;
};

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
