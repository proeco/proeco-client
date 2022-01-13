import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState, VFC } from 'react';

import { Team, User } from '~/domains';

import { TeamForm } from '~/components/domains/team/TeamForm';
import { DeleteTeamCard } from '~/components/domains/team/DeleteTeamCard';

import { URLS } from '~/constants';
import { TeamMemberSettingCard } from '~/components/domains/team/TeamMemberSettingCard';

type Props = {
  currentUser: User;
  team: Team;
};

type Content = 'basic' | 'member' | 'delete';

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  const router = useRouter();

  const [activeContent, setActiveContent] = useState<Content>('basic');

  useEffect(() => {
    if (!router.query.content) return;
    setActiveContent(router.query.content as Content);
  }, [router]);

  const handleClickSideMenu = (name: Content) => {
    setActiveContent(name);
    router.push(URLS.TEAMS_SETTINGS(team.productId) + `?content=${name}`);
  };

  const listItems: { content: Content; text: string }[] = useMemo(
    () => [
      { content: 'basic', text: '基本設定' },
      { content: 'member', text: 'メンバー設定' },
      { content: 'delete', text: 'プロダクトの削除' },
    ],
    [],
  );

  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          {listItems.map((listItem, index) => {
            return (
              <span
                key={index}
                className={`c-pointer list-group-item list-group-item-action rounded ${activeContent === listItem.content && 'active'}`}
                onClick={() => handleClickSideMenu(listItem.content)}
              >
                {listItem.text}
              </span>
            );
          })}
        </div>
        <div className="col-12 col-md-9">
          {activeContent === 'basic' && <TeamForm currentUser={currentUser} team={team} />}
          {activeContent === 'member' && <TeamMemberSettingCard team={team} />}
          {activeContent === 'delete' && <DeleteTeamCard team={team} />}
        </div>
      </div>
    </>
  );
};
