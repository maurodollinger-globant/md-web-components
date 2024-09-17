import type { Meta, StoryObj } from '@storybook/html';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-checkbox',
  tags: ['autodocs'],
  render: args => {
    return `
      <md-checkbox 
        data-testid="md-checkbox"
        checked="${args.checked}" 
        changeEvent="(e)=>console.log(e.detail)">
        ${args.slotContent}
      </md-checkbox>`;
  },
  args: {
    checked: false,
    slotContent: 'Checkbox',
  },
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
    },
    slotContent: {
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    story => `
    <style>
      :root {
        --md-color-checked: #6200ee;
        --md-checkbox-shadow: 1px 1px 0 1px #6300ee3e;
      }
    </style>
    ${story()}
  `,
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByTestId('md-checkbox');
    expect(checkbox).toHaveTextContent('Checkbox');

    // Esperar a que el shadow root esté disponible
    const shadowRoot = await waitFor(() => {
      const root = checkbox.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      }
      return root;
    });

    // Acceder al input checkbox dentro del shadow root
    const inputCheckbox = await waitFor(() => {
      const input = shadowRoot.querySelector('input[type="checkbox"]');
      if (!input) {
        throw new Error('input[type="checkbox"] not found in shadowRoot');
      } else {
      }
      return input as HTMLInputElement;
    });

    expect(inputCheckbox.checked).toBe(false);
    await userEvent.click(inputCheckbox);
    await waitFor(() => expect(inputCheckbox.checked).toBe(true));
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
