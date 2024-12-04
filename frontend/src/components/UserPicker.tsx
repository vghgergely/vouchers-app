import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

function UserPicker({className} : {className: string}) {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
      if (response.data.length > 0) {
        setSelectedUser(response.data[0]);
        dispatch(setUser(response.data[0]));
      }
    });
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedUser(users.find((user) => user.id == selectedId) || null);
    dispatch(setUser(users.find((user) => user.id == selectedId) || null));
  }

  return (
    <div className={`${className} pt-3 dark`}>
      <select 
        className="transition duration-300 bg-blue-200 border text-center border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-red-300 focus:border-red-300 block w-auto p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedUser?.id}
        onChange={handleChange}
      >
        {users.map((user) => (
          <option className="text-center" key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserPicker;