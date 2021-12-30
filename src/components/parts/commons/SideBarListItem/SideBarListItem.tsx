import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  icon: JSX.Element;
  selected: boolean;
};

export const SideBarListItem: FC<Props> = ({ children, selected, icon }) => {
  return (
    <StyledList
      className={`list-group-item list-group-item-action border-0 d-flex align-items-center rounded-2 ${selected ? 'bg-primary' : ''}`}
    >
      {icon}
      <span className="ms-2">{children}</span>
    </StyledList>
  );
};

const StyledList = styled.li`
  :hover {
    background: #e3f2fd;
  }
`;
