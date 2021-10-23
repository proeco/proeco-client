import { Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

export type Methods = {
  get: {
    query?: {
      userId?: string;
      page: number;
      limit: number;
    };
    headers: { token?: string };
    resBody: PaginationResult<Story>;
  };
};
