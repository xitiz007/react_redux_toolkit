import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchUsers } from "./app/features/users/usersSlice";
import { fetchPosts } from "./app/features/posts/postsSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

store.dispatch(fetchPosts())
store.dispatch(fetchUsers());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
