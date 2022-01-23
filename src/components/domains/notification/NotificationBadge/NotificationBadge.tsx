import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, VFC } from 'react';
import { DropdownItem } from 'reactstrap';
import styled from 'styled-components';
import { Dropdown, Icon, Spinner } from '~/components/parts/commons';
import { DATE_FORMAT } from '~/constants';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useNotifications } from '~/stores/notification';
import { restClient } from '~/utils/rest-client';

export const NotificationBadge: VFC = () => {
  const router = useRouter();

  const { notifyErrorMessage } = useErrorNotification();
  const { data: notificationsPagination, isValidating: isValidatingNotifications } = useNotifications();
  const uncheckCount = notificationsPagination?.docs.filter((v) => !v.isChecked).length || 0;

  const handleClickNotification = useCallback(
    async (url: string, id: string) => {
      try {
        await restClient.apiPut(`/notifications/${id}`, { notification: { isChecked: true } });
        router.push(url);
      } catch (error) {
        notifyErrorMessage('通信に失敗しました');
      }
    },
    [notifyErrorMessage, router],
  );

  return (
    <Dropdown
      toggle={
        <div className="position-relative">
          <Icon icon="BELL" color="WHITE" />
          {uncheckCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {uncheckCount > 99 ? '99+' : uncheckCount}
            </span>
          )}
        </div>
      }
    >
      <StyledDiv>
        <p className="mb-0 text-center">通知</p>
        <DropdownItem divider />
        {isValidatingNotifications && (
          <div className="text-center py-3">
            <Spinner />
          </div>
        )}
        {(notificationsPagination?.docs || []).map((notification, index) => {
          return (
            <StyledDropdownItem
              key={index}
              $unchecked={!notification.isChecked}
              onClick={() => handleClickNotification(notification.url, notification._id)}
            >
              <p className="mb-0 text-wrap">{notification.message}</p>
              <span className="fs-3">{format(notification.createdAt, DATE_FORMAT.EXCEPT_SECOND)}</span>
            </StyledDropdownItem>
          );
        })}
      </StyledDiv>
    </Dropdown>
  );
};

const StyledDiv = styled.div`
  width: 300px;
`;

const StyledDropdownItem = styled(DropdownItem)<{ $unchecked: boolean }>`
  ${(props) => props.$unchecked && `background-color: #fff3cd;`}
`;
