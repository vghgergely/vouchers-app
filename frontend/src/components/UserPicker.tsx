import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../states/userSlice";
import { RootState } from "../store";

interface UserPickerProps {
  className: string;
  onError: (error: string) => void;
}

function UserPicker({className, onError} : UserPickerProps) {
  const [users, setUsers] = useState<any[]>([]);
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
      if (response.data.length > 0) {
        dispatch(setUser(response.data[0]));
      }
    }).catch(() => {
      onError('Error loading users, please try again later.');
    });
  }, [dispatch, onError]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    dispatch(setUser(users.find((user) => user.id === Number(selectedId)) || null));
  }

  return (
    <div className={`${className} pt-3`}>
      <select 
        className="border text-center text-sm rounded-2xl block w-auto px-4 py-2.5 bg-blue-500 border-gray-600 text-white hover:bg-blue-600 hover:border-gray-900"
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