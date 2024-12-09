import { useState, useEffect } from 'react';

const useDelayedState = (initialValue: boolean, delay = 3000): [boolean, (newValue: boolean) => void] => {
  const [value, setValue] = useState(initialValue);
  let timerId: NodeJS.Timeout | null = null;

  const updateValue = (newValue: boolean) => {
    setValue(newValue);
    if (timerId !== null) clearTimeout(timerId);
    timerId = setTimeout(() => setValue(initialValue), delay);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  return [value, updateValue];
};

export default useDelayedState;