import { useContext } from 'react';
import { UserContext, UserContextType } from '../contexts/UserContext';

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { useUserContext };
