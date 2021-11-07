/**
 * スラッグをもとにサブドメインのurlを返す
 * @param slug
 * @param pathname
 * @returns
 */
export const generateSubdomainUrl = (slug: string, pathname = ''): string => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${slug}.${process.env.NEXT_PUBLIC_ROOT_URL}${pathname}`;
};
