export type GetAccessControl = () => { destination: string; loginRequired: boolean } | { loginRequired: null };
export type WithGetAccessControl<P> = P & {
  getAccessControl?: GetAccessControl;
};
