import React, { ReactNode, FC, useState } from 'react';
import { Dropdown as DropdownOriginal, DropdownMenu, DropdownToggle, DropdownItem as DropdownItemOOriginal } from 'reactstrap';

type Props = {
  toggle: ReactNode;
  tag?: 'span';
};

export const Dropdown: FC<Props> = ({ toggle, tag, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownOriginal toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
      <DropdownToggle color="transparent" tag={tag} className="c-pointer">
        {toggle}
      </DropdownToggle>
      <DropdownMenu>{children}</DropdownMenu>
    </DropdownOriginal>
  );
};

export const DropdownItem: FC<{ onClick?: () => void }> = ({ onClick, children }) => {
  return (
    <DropdownItemOOriginal onClick={onClick} className="d-flex align-items-center">
      {children}
    </DropdownItemOOriginal>
  );
};
