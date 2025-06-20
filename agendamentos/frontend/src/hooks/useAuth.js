import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setAuth({ token, role });
    }
  }, []);

  return auth;
};
