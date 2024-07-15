import React, { createContext, useState, ReactNode } from 'react';

// Define your user type
interface UserUpdate {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  note?: string;
  profileImg?: string;
}
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  note: string;
  profileImg: string;
}

// Define context type
interface UserContextType {
  user: User | null;
  setUser: (_user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    throw new Error('user function not yet initialized');
  },
});

// User provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Value object to pass into context provider
  const value: UserContextType = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext, UserContextType, User, UserUpdate };
export default UserProvider;
