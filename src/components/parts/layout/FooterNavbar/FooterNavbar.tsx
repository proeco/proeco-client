import Link from 'next/link';
import { useRouter } from 'next/router';
import { VFC } from 'react';

import { IconMap } from '../../commons/Icon/Icon';
import { Icon } from '~/components/parts/commons';
import { URLS } from '~/constants';

export const FooterNavbar: VFC = () => {
  const router = useRouter();

  const navbarItemMappings: Array<{ text: string; url: string; icon: keyof typeof IconMap }> = [
    // { text: 'トップ', url: URLS., icon: 'HOME' },
    { text: 'ホーム', url: URLS.DASHBOARD_TEAMS, icon: 'HOME' },
    { text: '個人設定', url: URLS.DASHBOARD_SETTINGS, icon: 'GEAR' },
  ];

  return (
    <div className="fixed-bottom bg-white d-flex justify-content-evenly d-md-none border-top shadow-lg">
      {navbarItemMappings.map((v) => {
        const isActive = router.pathname.startsWith(v.url);
        return (
          <Link key={v.text} href={v.url}>
            <div className="text-center col d-flex flex-column bg-dark py-2 border-secondary">
              <small className="ms-1 text-nowrap">{v.icon != null && <Icon icon={v.icon} color={isActive ? 'PRIMARY' : 'BLACK'} />}</small>
              <span className={`ms-2 ${isActive ? 'text-primary' : 'text-dark'}`}>{v.text}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
