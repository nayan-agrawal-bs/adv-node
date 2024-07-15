const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

export default {
  UPLOAD: {
    IMAGE: { method: HttpMethod.POST, url: '/upload/images' },
    FILE: { method: HttpMethod.POST, url: '/upload/files' },
  },
  AUTH: {
    INFO: { method: HttpMethod.GET, url: '/auth/info' },
    LOGIN: { method: HttpMethod.POST, url: '/auth/login' },
    REGISTER: { method: HttpMethod.POST, url: '/auth/register' },
    FORGOT_PASSWORD: { method: HttpMethod.POST, url: '/auth/forgot_password' },
  },
  USER: {
    CREATE: { method: HttpMethod.POST, url: '/users' },
    UPDATE: {
      method: HttpMethod.PUT,
      url: `/users`,
    },
    DELETE: (userId: string) => ({
      method: HttpMethod.DELETE,
      url: `/users/${userId}`,
    }),
    GET_ALL: { method: HttpMethod.GET, url: '/users' },
    GET: () => ({
      method: HttpMethod.GET,
      url: `/users/`,
    }),
  },
} as const;
