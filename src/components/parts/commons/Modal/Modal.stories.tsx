import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from './Modal';

export default {
  title: 'parts/commons/Modal',
  component: Modal,
  argTypes: { onClose: { action: 'closed' } },
} as ComponentMeta<typeof Modal>;

const Content = <p>ここにコンテンツが入る</p>;

const Template: ComponentStory<typeof Modal> = (args) => {
  return <Modal {...args}></Modal>;
};

export const SmallModal = Template.bind({});
export const MediumModal = Template.bind({});
export const LargeModal = Template.bind({});
export const ModalWithoutTitle = Template.bind({});

SmallModal.args = {
  size: 'sm',
  open: true,
  content: Content,
  title: 'ここにタイトルが入る',
};

MediumModal.args = {
  ...SmallModal.args,
  size: 'lg',
};

LargeModal.args = {
  ...SmallModal.args,
  size: 'xl',
};

ModalWithoutTitle.args = {
  ...SmallModal.args,
  title: undefined,
};
