import { useState, useEffect } from 'react';

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    addEventListener('online', () => {
      setIsOnline(true);
    });

    addEventListener('offline', () => {
      setIsOnline(false);
    });
  }, []);
  return isOnline;
};

export default useOnline;
