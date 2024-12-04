import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";

function UserPicker() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    getUsers().then((users) => {
        setUsers(users.data);
        setSelectedUser(users.data[0])
    })
  }, []);

  return (
    <div className="pt-3 dark">
      <select 
        className="transition duration-300 bg-blue-200 border text-center border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-red-300 focus:border-red-300 block w-auto p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedUser?.id}
        onChange={(e) => {
          const selectedId = e.target.value;
          setSelectedUser(users.find((user) => user.id == selectedId) || null);
        }}
      >
        {users.map((user) => (
          <option className="text-center" key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {selectedUser && <div>Selected user: {selectedUser.name}</div>}
    </div>
  );
}

export default UserPicker;