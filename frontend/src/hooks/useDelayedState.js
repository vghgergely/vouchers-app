import { useState, useEffect } from 'react';

const useDelayedState = (initialValue, delay = 3000) => {
  const [value, setValue] = useState(initialValue);
  const [timer, setTimer] = useState(null);

  const updateValue = (newValue) => {
    setValue(newValue);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => setValue(initialValue), delay));
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return [value, updateValue];
};

export default useDelayedState;