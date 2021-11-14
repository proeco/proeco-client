import { parseCookies } from 'nookies';
import axiosBase from 'axios';

import aspida from '@aspida/axios';
import api from '../../api/$api';

export const apiClient = api(
  aspida(axiosBase, {
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT}/api/v1/` || 'http://localhost:8000/api/v1/',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${parseCookies()['next-auth-access-token']}`,
    },
    responseType: 'json',
  }),
);
