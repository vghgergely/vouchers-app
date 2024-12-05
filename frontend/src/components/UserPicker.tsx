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
      <div className="relative">
        <select
          className="appearance-none border text-center text-sm rounded-lg block w-auto px-7 py-1 bg-blue-500 border-transparent text-white hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          value={selectedUser?.id}
          onChange={handleChange}
        >
          {users.map((user) => (
            <option className="text-center" key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 px-2 text-white transform -translate-y-1/2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default UserPicker;