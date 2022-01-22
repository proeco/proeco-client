import React, { useState, VFC } from 'react';

import { UserIcon } from '~/components/domains/user/UserIcon';
import { ManageInviteLinkModal } from '~/components/domains/team/ManageInviteLinkModal';
import { Button, Card, Dropdown, DropdownItem, Icon, Tooltip } from '~/components/parts/commons';
import { Team, User } from '~/domains';

type Props = {
  team: Team;
  currentUser: User;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team, currentUser }) => {
  const [isOpenManageInviteLinkModal, setIsOpenManageInviteLinkModal] = useState(false);

  const handleClickUpdate = () => {};

  const handleClickDelete = () => {};

  const menuItems = [
    {
      icon: <Icon icon="CLOCKWISE" size={16} />,
      text: 'プロダクトの管理者を変更する',
      onClick: handleClickUpdate,
    },
    {
      icon: <Icon icon="TRASH" size={16} color="DANGER" />,
      text: 'プロダクトから削除する',
      onClick: handleClickDelete,
    },
  ];

  return (
    <>
      <Card>
        <Tooltip text="管理者のみが操作可能です" disabled={team.adminUserId === currentUser._id}>
          <Button color="primary" onClick={() => setIsOpenManageInviteLinkModal(true)} disabled={team.adminUserId !== currentUser._id}>
            メンバーを招待する
          </Button>
        </Tooltip>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">アイコン</th>
              <th scope="col">ユーザー名</th>
              <th scope="col">ステータス</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-middle">
              <th scope="row">
                <UserIcon size={40} />
              </th>
              <td>カノイ</td>
              <td>メンバー</td>
              <td className="text-end">
                <Dropdown toggle={<Icon icon="THREE_DOTS_VERTICAL" size={20} />} tag="span">
                  {menuItems.map((menuItem, i) => (
                    <DropdownItem key={i} onClick={menuItem.onClick}>
                      {menuItem.icon}
                      <span className="ms-2">{menuItem.text}</span>
                    </DropdownItem>
                  ))}
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      <ManageInviteLinkModal team={team} isOpen={isOpenManageInviteLinkModal} onCloseModal={() => setIsOpenManageInviteLinkModal(false)} />
    </>
  );
};
