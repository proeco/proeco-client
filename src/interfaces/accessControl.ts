export type GetAccessControl = () => { type: 'replace' | 'push'; destination: string; loginRequired: boolean } | { loginRequired: null };
export type WithGetAccessControl<P> = P & {
  getAccessControl?: GetAccessControl;
};
