import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots';

jest.mock('global', () => Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: '', document: { createElement: () => void 0 } } }));

initStoryshots({
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotExtension: '.tsx.snap',
    storiesExtensions: ['.tsx'],
  }),
});
