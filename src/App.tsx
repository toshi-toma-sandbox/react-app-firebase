import React from "react";
import { UserContextProvider } from "UserContext";
import { Router } from "Router";
import { Header } from "Header";

export const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Header />
      <Router />
    </UserContextProvider>
  );
};
