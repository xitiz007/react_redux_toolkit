import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AddPost from "./app/features/posts/AddPost";
import EditPost from "./app/features/posts/EditPost";
import PostsList from "./app/features/posts/PostsList";
import SinglePost from "./app/features/posts/SinglePost";
import UserList from "./app/features/users/UserList";
import UserPage from "./app/features/users/UserPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPost />} />
          <Route path="edit/:postId" element={<EditPost />} />
          <Route path=":postId" element={<SinglePost />} />
        </Route>
        <Route path="user">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
