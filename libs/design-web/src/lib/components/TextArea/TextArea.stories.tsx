import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'TextArea',
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Primary = {
  args: {},
};
