import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

jest.mock('global', () => Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: '' } }));

initStoryshots({
  test: multiSnapshotWithOptions(),
});
