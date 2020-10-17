import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

import { firestore } from "./firebase";

type Todo = {
  id: string;
  isCompleted: boolean;
  title: string;
};

export const TodoList: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // await firestore.collection("todos").get()
    return firestore.collection("todos").onSnapshot((snapshot) => {
      const dataList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTodos(dataList as Todo[]);
    });
  }, []);

  const handleAdd = () => {
    if (inputText.length === 0) {
      return;
    }
    firestore.collection("todos").add({ title: inputText, isCompleted: false });
    setInputText("");
  };

  const handleDelete = (id: string) => {
    firestore.doc(`todos/${id}`).delete();
  };

  const handleComplete = (id: string) => {
    // firestore.doc(`todos/${id}`).update("isCompleted", true);
    firestore.doc(`todos/${id}`).update({ isCompleted: true });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            value={inputText}
            placeholder="enter your todo "
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={handleAdd}>add</button>
        </div>
        {todos ? (
          <ul>
            {todos.map((t) => {
              if (t.isCompleted) {
                return null;
              }
              return (
                <li key={t.id}>
                  {!t.isCompleted && (
                    <button onClick={() => handleComplete(t.id)}>○</button>
                  )}
                  <span>{t.title}</span>
                  <button
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleDelete(t.id)}
                  >
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </header>
    </div>
  );
};
