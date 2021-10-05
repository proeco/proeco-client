import React, { ComponentProps, VFC } from 'react';
import { styled } from '@mui/material/styles';
import { Step, StepLabel, Stepper } from '@mui/material';

import { TEXT_COLOR } from '~/constants/colors';

type Props = ComponentProps<typeof Stepper>;

const steps = ['ストーリーを作る', 'ゴールを決める', 'タスクを作る'];

export const StoryStepper: VFC<Props> = ({ ...rest }) => {
  return (
    <Stepper alternativeLabel {...rest}>
      {steps.map((label) => (
        <StyledStep key={label}>
          <StyledStepLabel>{label}</StyledStepLabel>
        </StyledStep>
      ))}
    </Stepper>
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
    fill: ${TEXT_COLOR};
  }
  .MuiStepLabel-label {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
`;
