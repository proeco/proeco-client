import { VFC } from 'react';
import { Icon } from '~/components/parts/commons';

type Props = {
  onClick: () => void;
  count: number;
};

export const NotificationBadge: VFC<Props> = ({ onClick, count }) => {
  return (
    <button type="button" className="btn btn-sm btn-primary position-relative" onClick={onClick}>
      <Icon icon="BELL" color="WHITE" />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count > 99 ? '99+' : count}</span>
    </button>
  );
};
