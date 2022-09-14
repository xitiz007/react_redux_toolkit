import { useSelector } from "react-redux";
import { getAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => getAllUsers(state));
  const usersList = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>
        <h2>{user.name}</h2>
      </Link>
    </li>
  ));
  return (
    <section>
        <h2>Users</h2>
      <ul>{usersList}</ul>
    </section>
  );
};

export default UserList;
