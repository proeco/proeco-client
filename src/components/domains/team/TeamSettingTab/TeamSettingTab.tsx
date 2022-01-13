import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState, VFC } from 'react';
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

  const listItems = useMemo(
    () => [
      { content: 'basic', text: '基本設定' },
      { content: 'team', text: 'メンバー設定' },
    ],
    [],
  );

  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          {listItems.map((listItem, index) => (
            <span
              key={index}
              className={`c-pointer list-group-item list-group-item-action rounded ${activeContent === listItem.content && 'active'}`}
              onClick={() => handleClickSideMenu(listItem.content)}
            >
              {listItem.text}
            </span>
          ))}
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
