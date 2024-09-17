import type { Meta, StoryObj } from '@storybook/html';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-input',
  tags: ['autodocs'],
  render: args => {
    return `
        <md-input 
            data-testid="md-input"
            value="${args.value}"
            placeholder="${args.placeholder}"
            disabled="${args.disabled}"
            changeEvent='(e)=>{console.log(e.detail)}'"
            >
        </md-input>`;
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Please write something...',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mdInput = canvas.getByTestId('md-input');
    expect(mdInput).toHaveAttribute('disabled', 'false');

    expect(mdInput).toHaveAttribute('placeholder', 'Please write something...');

    const shadowRoot = await waitFor(() => {
      const root = mdInput.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      } else {
        return root;
      }
    });

    const input = await waitFor(() => {
      const input = shadowRoot.querySelector('input');
      if (!input) {
        throw new Error('Input not found');
      } else {
        return input as HTMLInputElement;
      }
    });

    await userEvent.type(input, 'Hello World!');
    await waitFor(() => {
      expect(input).toHaveValue('Hello World!');
    });
  },
};

export const Disabled: Story = {
  args: {
    value: 'Hello World',
    placeholder: 'Please write something...',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('md-input');
    expect(input).toHaveAttribute('disabled');
  },
};
