import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import emitter, {
  EVENT_AUTH_TOKEN,
  EVENT_AUTH_TOKEN_INVALID,
  EVENT_LOGOUT,
} from '../helpers/emitter';
import Storage from '../helpers/Storage';
import { useGetUserAction } from '../hooks/useUserData';
import { useUserContext } from '../hooks/useUserContext';

// Define context type
interface AuthContextType {
  authToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  route: string | null;
  isLoading: boolean;
  emitToken: (_authToken: string, _route?: string) => void;
  emitLogout: (_authToken?: string, _route?: string) => void;
}

// Create a context object with initial values
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  route: null,
  emitToken: (_authToken: string, _route?: string) => {},
  emitLogout: (_authToken?: string, _route?: string) => {},
});

// Auth provider component
const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [route, setRoute] = useState<string | null>(null);
  const { getUserData } = useGetUserAction();
  const { user, setUser } = useUserContext();

  const emitToken = useCallback((authToken: string, route?: string) => {
    emitter.emit(EVENT_AUTH_TOKEN, {
      authToken,
      route,
    });
  }, []);

  const emitLogout = useCallback((authToken?: string, route?: string) => {
    emitter.emit(EVENT_LOGOUT, {
      authToken,
      route,
    });
  }, []);

  const onAuthTokenInvalid = useCallback(async () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    await Storage.removeItem(Storage.AUTH_TOKEN);
  }, [setUser]);

  const onLogout = useCallback(async () => {
    onAuthTokenInvalid();
    setRoute(null);
    setIsAuthenticated(false);
    await Storage.clear();
  }, [onAuthTokenInvalid]);

  const onAuthToken = useCallback(
    async ({ authToken, route, resolve }: any) => {
      await Storage.setItem(Storage.AUTH_TOKEN, authToken);
      setAuthToken(authToken);
      setIsAuthenticated(true);
      if (route) {
        setRoute(route);
      }

      // callback function used to have control over the execution flow
      if (resolve) {
        resolve();
      }
    },
    []
  );

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!user && authToken) {
          setIsLoading(true);

          const data = await getUserData(authToken);
          if (!data) {
            setIsLoading(false);
            onAuthTokenInvalid();
          }
          setUser(data);
          // Validate token here
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        onAuthTokenInvalid();
      }
    };

    validateToken();
  }, [authToken, getUserData, onAuthTokenInvalid, setUser, user]);

  useEffect(() => {
    emitter.addListener(EVENT_LOGOUT, onLogout);
    emitter.addListener(EVENT_AUTH_TOKEN_INVALID, onAuthTokenInvalid);
    emitter.addListener(EVENT_AUTH_TOKEN, onAuthToken);

    return () => {
      emitter.removeListener(EVENT_LOGOUT, onLogout);
      emitter.removeListener(EVENT_AUTH_TOKEN_INVALID, onAuthTokenInvalid);
      emitter.removeListener(EVENT_AUTH_TOKEN, onAuthToken);
    };
  }, [onAuthToken, onAuthTokenInvalid, onLogout]);

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const myToken = (await Storage.getItem(Storage.AUTH_TOKEN)) || null;
        if (myToken) {
          setAuthToken(myToken);
          emitToken(myToken);
          setIsInitialized(true);
        }
      } catch (err) {
        // Tokens not found, no action required.
      }
    };

    checkStorage();
  }, [emitToken]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authToken,
      isInitialized,
      isLoading,
      route,
      emitToken,
      emitLogout,
    }),
    [
      isAuthenticated,
      authToken,
      isInitialized,
      isLoading,
      route,
      emitToken,
      emitLogout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, AuthContextType };
export default AuthProvider;
