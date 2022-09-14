import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, updatePost, deletePost } from "./postsSlice";
import { getAllUsers } from "../users/usersSlice";
import { useState } from "react";

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => getPost(state, Number(postId)));
  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [userId, setUserId] = useState(post?.userId);
  const [content, setContent] = useState(post?.body);
  const [loading, setLoading] = useState(false);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const onDeleteHandler = async () => {
    setLoading(true);
    try {
      await dispatch(deletePost({ id: post.id })).unwrap();
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedPost = { ...post, title, userId: Number(userId), body: content };
      await dispatch(updatePost(updatedPost)).unwrap();
      navigate(`/post/${post.id}`);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

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
          Update Post
        </button>
        <button
          disabled={loading}
          className="deleteButton"
          type="button"
          onClick={onDeleteHandler}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
