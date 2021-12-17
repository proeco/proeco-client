export type AccessControlType = 'replace' | 'push';
export type AccessControlFallback = { type: AccessControlType; destination: string };
export type GetAccessControl = () => null | AccessControlFallback | Promise<null | AccessControlFallback>;
export type WithGetAccessControl<P> = P & {
  getAccessControl?: GetAccessControl;
};
