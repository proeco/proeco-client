import React, { ComponentProps, VFC } from 'react';
import { styled } from '@mui/material/styles';
import { Step, StepLabel, Stepper as MuiStepper } from '@mui/material';

import { Typography } from '~/components/parts/commons';

type StepsType = {
  steps: string[];
};

type Props = ComponentProps<typeof MuiStepper> & StepsType;

export const Stepper: VFC<Props> = ({ steps, ...rest }) => {
  return (
    <MuiStepper alternativeLabel {...rest}>
      {steps.map((label) => (
        <StyledStep key={label}>
          <StyledStepLabel>
            <Typography variant="body1">{label}</Typography>
          </StyledStepLabel>
        </StyledStep>
      ))}
    </MuiStepper>
  );
};

const StyledStep = styled(Step)`
  .MuiStepConnector-root {
    top: 20px;
  }
`;

const StyledStepLabel = styled(StepLabel)`
  .MuiStepIcon-root {
    width: 40px;
    height: auto;
  }
  .MuiStepIcon-root.Mui-active {
    color: ${(props) => props.theme.palette.secondary.main};
    .MuiStepIcon-text {
      fill: white;
    }
  }
  .MuiStepIcon-root.Mui-completed {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .MuiStepIcon-text {
    fill: ${(props) => props.theme.palette.textColor.main};
  }
`;
