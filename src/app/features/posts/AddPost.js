import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !userId) return;
    setLoading(true);
    try {
      dispatch(addNewPost({ title, body: content, userId })).unwrap();
      setTitle("");
      setContent("");
    } catch (err) {
      console.log("failed to save the post");
    }

    setLoading(false);
  };
  const users = useSelector(getAllUsers);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="title">Title</label>
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="author">Author</label>
        <select
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          id="author"
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="content">Content</label>
        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          type="text"
          name="content"
          id="content"
        />
        <button disabled={loading} type="submit">
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPost;
