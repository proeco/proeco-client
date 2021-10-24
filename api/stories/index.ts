import { Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

export type Methods = {
  get: {
    query?: {
      userId?: string;
      page: number;
      limit: number;
    };
    resBody: PaginationResult<Story>;
  };
};
