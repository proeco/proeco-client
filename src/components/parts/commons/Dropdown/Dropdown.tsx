import React, { ReactNode, FC, useState } from 'react';
import { Dropdown as DropdownOriginal, DropdownMenu, DropdownToggle, DropdownItem as DropdownItemOOriginal } from 'reactstrap';

type Props = {
  toggle: ReactNode;
};

export const Dropdown: FC<Props> = ({ toggle, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownOriginal toggle={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
      <DropdownToggle color="transparent">{toggle}</DropdownToggle>
      <DropdownMenu>{children}</DropdownMenu>
    </DropdownOriginal>
  );
};

export const DropdownItem: FC<{ onClick?: () => void }> = ({ onClick, children }) => {
  return <DropdownItemOOriginal onClick={onClick}>{children}</DropdownItemOOriginal>;
};
