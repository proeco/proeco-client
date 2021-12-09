export const URLS = {
  TOP: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_TEAMS: '/dashboard/teams',
  DASHBOARD_TEAMS_NEW: '/dashboard/teams/new',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  TEAMS: (productId: string) => `/${productId}`,
  TEAMS_STORIES: (teamId: string) => `/${teamId}/story`,
  TEAMS_STORY: (teamId: string, storyId: string, storyPostId?: string) =>
    `/${teamId}/story/${storyId}${storyPostId ? `?storyPostId=${storyPostId}` : ''}`,
  TEAMS_SETTING: (teamId: string) => `/${teamId}/settings`,
  TERMS: '#',
  PRIVACY_POLICY: '#',
};
