/* eslint-disable @typescript-eslint/no-unused-vars */
import APIs from '../config/apis';
import { useState } from 'react';
import apiClient from '../config/axiosConfig';
import Cookie from 'cookie-universal';
import { User, UserUpdate } from '../contexts/UserContext';
import { useUserContext } from './useUserContext';
const useRegisterUserAction = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const registerUserAction = async (userData: any) => {
    try {
      setLoading(true);
      const response = await apiClient({
        ...APIs.AUTH.REGISTER,
        data: userData,
      });
      if (response.status === 200) {
        setData(response.data);
      }
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
    } catch (ex) {
      setData(null);
      throw ex;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, registerUserAction };
};

const useLoginAction = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cookies = Cookie();
  const loginAction = async (userData: any, rememberMe = false) => {
    try {
      setLoading(true);
      const response = await apiClient({
        ...APIs.AUTH.LOGIN,
        data: userData,
      });
      const token = response.data?.data;
      const email = userData.email;

      setAuthToken(token);
      if (rememberMe) {
        cookies.set('rememberToken', token, {
          maxAge: 604800000,
          httpOnly: true,
        });
        cookies.set('rememberEmail', email, {
          maxAge: 604800000,
          httpOnly: true,
          secure: true,
        });
      }
    } catch (ex) {
      setAuthToken(null);
      throw ex;
    } finally {
      setLoading(false);
    }
  };

  return { loading, authToken, loginAction };
};

const useForgotPasswordAction = () => {
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const forgotPasswordAction = async (email: string) => {
    try {
      setLoading(true);
      const response = await apiClient({
        ...APIs.AUTH.FORGOT_PASSWORD,
        data: { email },
      });
      if (response.status === 200) {
        setIsSendEmail(true);
      }
    } catch (ex) {
      console.error('Forgot password request failed:', ex);
      throw ex;
    } finally {
      setLoading(false);
    }
  };

  return { loading, isSendEmail, forgotPasswordAction };
};

const useGetUserAction = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserData = async (authToken: string): Promise<User | null> => {
    if (!authToken) {
      setError('No authentication token found');
      return null;
    }

    try {
      setLoading(true);
      const response = await apiClient({
        method: APIs.USER.GET().method,
        url: APIs.USER.GET().url,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLoading(false);
      setData(response.data.data);
      return response.data.data;
    } catch (ex: any) {
      setLoading(false);
      console.error(ex);
      setError(ex.message);
      setData(null);
      throw ex;
    }
  };

  return { loading, error, data, getUserData };
};

const useUserUpdateAction = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useUserContext();

  const updateUserAction = async (userData: UserUpdate) => {
    try {
      if (user?.id) {
        setLoading(true);
        const response = await apiClient({
          ...APIs.USER.UPDATE,
          data: userData,
        });
        if (response.status === 200) {
          setUser(response.data.data);
          setData(response.data);
        }
        if (response.status === 400) {
          throw new Error(response.data.message);
        }
      }
    } catch (ex) {
      setData(null);
      throw ex;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, updateUserAction };
};

export {
  useRegisterUserAction,
  useLoginAction,
  useForgotPasswordAction,
  useGetUserAction,
  useUserUpdateAction,
};
