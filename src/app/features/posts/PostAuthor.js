import { useSelector } from "react-redux";
import { getAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(getAllUsers);
  const user = users.find((user) => user.id === userId);
  return <span>{user?.name || "Unknown author"}</span>;
};

export default PostAuthor;
