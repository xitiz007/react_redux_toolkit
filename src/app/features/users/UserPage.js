import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserPosts } from "../posts/postsSlice";
import { getUser } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const posts = useSelector((state) => getUserPosts(state, Number(userId)));
  const user = useSelector((state) => getUser(state, Number(userId)));
  const postsList = posts.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <div>
        <h2>{user?.name}</h2>
      <ol>{postsList}</ol>
    </div>
  );
};

export default UserPage;
