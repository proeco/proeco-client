import { useRouter } from 'next/router';
import React, { useEffect, useState, VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { TeamMemberSettingCard } from '~/components/domains/team/TeamMemberSettingCard';
import { URLS } from '~/constants';
import { Team, User } from '~/domains';

type Props = {
  currentUser: User;
  team: Team;
};

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  const router = useRouter();

  const [activeContent, setActiveContent] = useState('basic');

  useEffect(() => {
    if (!router.query.content) return;
    setActiveContent(router.query.content as string);
  }, [router]);

  const handleClickSideMenu = (name: string) => {
    router.push(URLS.TEAMS_SETTINGS(team.productId) + `?content=${name}`);
  };

  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          <span
            className={`list-group-item list-group-item-action rounded ${activeContent === 'basic' && 'active'}`}
            onClick={() => handleClickSideMenu('basic')}
          >
            基本設定
          </span>
          <span
            className={`list-group-item list-group-item-action rounded ${activeContent === 'member' && 'active'}`}
            onClick={() => handleClickSideMenu('member')}
          >
            メンバー管理
          </span>
          {/* TODO */}
          {/* <a href="#" className="list-group-item list-group-item-action">
            重要な設定
          </a> */}
        </div>
        <div className="col-12 col-md-9">
          {activeContent === 'basic' && <TeamForm currentUser={currentUser} team={team} />}
          {activeContent === 'member' && <TeamMemberSettingCard team={team} />}
        </div>
      </div>
    </>
  );
};
