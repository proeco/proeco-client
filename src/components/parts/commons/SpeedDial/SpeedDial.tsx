import React, { ComponentProps, VFC } from 'react';
import { SpeedDial as MuiSpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { styled } from '@mui/system';
import { Icon } from '~/components/parts/commons';

type Props = {
  actions: {
    icon: ComponentProps<typeof Icon>['icon'];
    name: string;
    onClick: () => void;
  }[];
};

export const SpeedDial: VFC<Props> = ({ actions }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledSpeedDial direction="left" ariaLabel="SpeedDial" icon={<SpeedDialIcon />} open={open} onClose={handleClose} onOpen={handleOpen}>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={<Icon icon={action.icon} />} tooltipTitle={action.name} onClick={action.onClick} />
      ))}
    </StyledSpeedDial>
  );
};

const StyledSpeedDial = styled(MuiSpeedDial)`
  .MuiSpeedDial-fab {
    width: 24px;
    height: 24px;
    min-height: unset;
  }
  .MuiSpeedDialIcon-root {
    height: 100%;
  }
  .MuiSpeedDialIcon-icon {
    width: 100%;
    height: 100%;
    display: block;
  }
  .MuiSpeedDialAction-fab {
    width: 24px;
    height: 24px;
    min-height: unset;
  }
`;
