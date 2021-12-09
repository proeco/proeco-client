export const URLS = {
  TOP: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_TEAMS: '/dashboard/teams',
  DASHBOARD_TEAMS_NEW: '/dashboard/teams/new',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  TEAMS: (productId: string) => `/${productId}`,
  TEAMS_STORIES: (productId: string) => `/${productId}/story`,
  TEAMS_STORY: (productId: string, storyId: string, storyPostId?: string) =>
    `/${productId}/story/${storyId}${storyPostId ? `?storyPostId=${storyPostId}` : ''}`,
  TEAMS_SETTING: (productId: string) => `/${productId}/settings`,
  TERMS: '#',
  PRIVACY_POLICY: '#',
};
