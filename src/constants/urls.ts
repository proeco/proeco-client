export const URLS = {
  TOP: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_TEAMS: '/dashboard/teams',
  DASHBOARD_TEAMS_NEW: '/dashboard/teams/new',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  TERMS: '#',
  TEAMS_DASHBOARD: (teamId: string) => `/team/${teamId}/dashboard`,
  TEAMS_DASHBOARD_STORIES: (teamId: string) => `/team/${teamId}/dashboard/story`,
  TEAMS_DASHBOARD_STORY: (teamId: string, storyId: string) => `/team/${teamId}/dashboard/story/${storyId}`,
  TEAMS_DASHBOARD_SETTING: (teamId: string) => `/team/${teamId}/dashboard/settings`,
  PRIVACY_POLICY: '#',
};
