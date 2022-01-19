import React, { ReactNode, FC, useState } from 'react';
import { Dropdown as DropdownOriginal, DropdownMenu, DropdownToggle, DropdownItem as DropdownItemOOriginal } from 'reactstrap';

type Props = {
  toggle: ReactNode;
  tag?: 'span' | 'div';
};

export const Dropdown: FC<Props> = ({ toggle, tag, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownOriginal toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
      <DropdownToggle color="transparent" tag={tag} className="c-pointer">
        {toggle}
      </DropdownToggle>
      <DropdownMenu end>{children}</DropdownMenu>
    </DropdownOriginal>
  );
};

export const DropdownItem: FC<{ onClick?: () => void; divider?: boolean }> = ({ onClick, divider, children }) => {
  return (
    <DropdownItemOOriginal onClick={onClick} divider={divider} className="d-flex align-items-center">
      {children}
    </DropdownItemOOriginal>
  );
};
