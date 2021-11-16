import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';

jest.mock('global', () => Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: '', document: { createElement: () => void 0 } } }));

initStoryshots({
  test: ({ story: { storyFn: Story }, context }) => {
    const converter = new Stories2SnapsConverter({
      snapshotExtension: '.tsx.snap',
    });
    const snapshotFilename = converter.getSnapshotFileName(context);
    const rendered = render(<Story {...context} />);
    expect(rendered).toMatchSpecificSnapshot(snapshotFilename);
  },
});
