import React, { useState, VFC } from 'react';

import { DeleteTeamMemberModal } from '../DeleteTeamMemberModal';
import { UpdateAdminUserOfTeamModal } from '../UpdateAdminUserOfTeamModal';
import { UserIcon } from '~/components/domains/user/UserIcon';

import { Team, User } from '~/domains';
import { Dropdown, DropdownItem, Icon } from '~/components/parts/commons';

type Props = {
  user: User;
  team: Team;
};

export const TeamMemberTableRow: VFC<Props> = ({ user, team }) => {
  const [isDeleteTeamMemberModal, setIsDeleteTeamMemberModal] = useState(false);
  const [isUpdateAdminUserOfTeamModal, setIsUpdateAdminUserOfTeamModal] = useState(false);

  const menuItems = [
    {
      icon: <Icon icon="CLOCKWISE" size={16} />,
      text: 'プロダクトの管理者を変更する',
      onClick: () => setIsUpdateAdminUserOfTeamModal(true),
    },
    {
      icon: <Icon icon="TRASH" size={16} color="DANGER" />,
      text: 'プロダクトから削除する',
      onClick: () => setIsDeleteTeamMemberModal(true),
    },
  ];

  return (
    <tr className="align-middle">
      <th scope="row">
        <UserIcon attachmentId={user.iconImageId} userId={user._id} size={40} />
      </th>
      <td>{user.name}</td>
      <td>{team.adminUserId === user._id ? '管理者' : 'メンバー'}</td>
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
      <DeleteTeamMemberModal
        isOpen={isDeleteTeamMemberModal}
        onCloseModal={() => setIsDeleteTeamMemberModal(false)}
        userId={user._id}
        teamId={team._id}
      />
      <UpdateAdminUserOfTeamModal
        isOpen={isUpdateAdminUserOfTeamModal}
        onCloseModal={() => setIsUpdateAdminUserOfTeamModal(false)}
        userId={user._id}
        userName={user.name}
        teamId={team._id}
      />
    </tr>
  );
};
