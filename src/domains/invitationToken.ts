export class InvitationToken {
  _id: string;
  token: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: InvitationToken) {
    this._id = init._id;
    this.token = init.token;
    this.teamId = init.teamId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}

/**
 * サーバーから返ってくる日付データをDate型に変換する
 * @param invitationToken
 * @returns {InvitationToken}
 */
export const convertInvitationTokenFromServer = (invitationToken: InvitationToken) => {
  return new InvitationToken({
    ...invitationToken,
    createdAt: new Date(invitationToken.createdAt),
    updatedAt: new Date(invitationToken.updatedAt),
  });
};
