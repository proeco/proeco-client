import { format } from 'date-fns';
import { VFC } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownItem, Icon, Link, Spinner } from '~/components/parts/commons';
import { DATE_FORMAT } from '~/constants';
import { useNotifications } from '~/stores/notification';

export const NotificationBadge: VFC = () => {
  const { data: notificationsPagination, isValidating: isValidatingNotifications } = useNotifications();
  const docsCount = notificationsPagination?.docs.length || 0;

  return (
    <Dropdown
      toggle={
        <div className="position-relative">
          <Icon icon="BELL" color="WHITE" />
          {docsCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {docsCount > 99 ? '99+' : docsCount}
            </span>
          )}
        </div>
      }
    >
      <StyledDiv>
        <p className="mb-0 text-center">通知</p>
        <DropdownItem divider />
        {isValidatingNotifications && <Spinner />}
        {(notificationsPagination?.docs || []).map((notification, index) => {
          if (!notification.url)
            return (
              <DropdownItem>
                <div>
                  <p className="mb-0 text-wrap">{notification.message}</p>
                  <span className="fs-3">{format(notification.createdAt, DATE_FORMAT.EXCEPT_SECOND)}</span>
                </div>
              </DropdownItem>
            );
          return (
            <Link key={index} href={notification.url}>
              <DropdownItem>
                <div>
                  <p className="mb-0 text-wrap">{notification.message}</p>
                  <span className="fs-3">{format(notification.createdAt, DATE_FORMAT.EXCEPT_SECOND)}</span>
                </div>
              </DropdownItem>
            </Link>
          );
        })}
      </StyledDiv>
    </Dropdown>
  );
};

const StyledDiv = styled.div`
  width: 300px;
`;
