export const URLS = {
  TOP: '/',
  API_LOGIN: '/api/auth/login?returnTo=/dashboard/settings',
  API_LOGOUT: '/api/auth/logout',
  DASHBOARD: '/dashboard',
  DASHBOARD_TEAMS: '/dashboard/teams',
  DASHBOARD_TEAMS_NEW: '/dashboard/teams/new',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  TEAMS: (productId: string, hash?: string) => `/${productId}${hash ? hash : ''}`,
  TEAMS_STORY: (productId: string, storyId: string, storyPostId?: string) =>
    `/${productId}/story/${storyId}${storyPostId ? `?storyPostId=${storyPostId}` : ''}`,
  TERM: '/term',
  PRIVACY_POLICY: '#',
};
