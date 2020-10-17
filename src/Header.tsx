import React, { useContext } from "react";
import { UserContext } from "UserContext";
import { signInWithGoogle, signOutWithGoogle } from "./firebase";

export const Header: React.FC = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <nav
      style={{
        backgroundColor: "tomato",
      }}
    >
      <h1>Todo App with React + Firebase</h1>
      <div>
        {currentUser === null ? (
          <button
            onClick={async () => {
              await signInWithGoogle();
              window.location.href = "/";
            }}
          >
            Login
          </button>
        ) : (
          <div style={{ display: "flex" }}>
            <img src={currentUser.photoURL ?? ""} alt="icon" />
            <span>{currentUser.displayName}</span>
            <button onClick={signOutWithGoogle}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};
