import axios, { AxiosResponse } from 'axios';
import _ from 'underscore';

export const BASE_URL = `${
  process.env.NX_PUBLIC_API_URL || 'http://localhost:3001'
}`;

const apiClient = async (inputData: any) => {
  const token = localStorage.getItem('JWT_AUTH_TOKEN');

  const requestObj = _.extend(
    {},
    {
      url: `${BASE_URL}${inputData.url}`,
      method: inputData.method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && token.length > 0
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
    },
    _.omit(inputData, 'url', 'method')
  );

  const response: AxiosResponse<any> = await axios(requestObj);

  return response as any;
};

export default apiClient;
