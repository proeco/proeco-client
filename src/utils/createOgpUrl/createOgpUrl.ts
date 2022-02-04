/**
 * ogpのurlを返すutil
 * @param title string
 * @param teamName string
 * @param teamIconUrl string
 * @returns string
 */
export const createOgpUrl = (title: string, teamName: string, teamIconUrl: string) => {
  return `https://proeco-ogp.vercel.app/api/ogp?title=${encodeURIComponent(title)}&teamName=${encodeURIComponent(
    teamName,
  )}&teamIconUrl=${teamIconUrl}`;
};
