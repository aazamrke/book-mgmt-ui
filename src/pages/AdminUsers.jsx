import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser
} from "../api/admin";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <>
      <h2>Admin – User Management</h2>

      {users.map(u => (
        <div key={u.id}>
          {u.username} | Role: {u.role}

          <select
            onChange={e =>
              updateUserRole(u.id, e.target.value)
            }
          >
            <option>user</option>
            <option>admin</option>
          </select>

          <button onClick={() =>
            deleteUser(u.id)
              .then(() => setUsers(users.filter(x => x.id !== u.id)))
          }>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
