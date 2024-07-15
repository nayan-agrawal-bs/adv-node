/* eslint-disable @typescript-eslint/no-unused-vars */
import APIs from '../config/apis';
import { useState } from 'react';
import apiClient from '../config/axiosConfig';
import { useAuthContext } from './useAuthContext';
interface UploadImageResponse {
  fileUrl: string;
  message: string;
}
const useUploadImage = () => {
  const [data, setData] = useState<UploadImageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuthContext();

  const uploadImage = async (
    file: any
  ): Promise<UploadImageResponse | null> => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient({
        method: APIs.UPLOAD.IMAGE.method,
        url: APIs.UPLOAD.IMAGE.url,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      setLoading(false);
      setData(response.data);
      return response.data;
    } catch (ex: any) {
      setLoading(false);
      setError(ex.message);
      setData(null);
      throw ex;
    }
  };

  return { loading, error, data, uploadImage };
};

export { useUploadImage };
