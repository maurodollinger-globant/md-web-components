import { Meta, StoryObj } from '@storybook/html';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-dropdown-list',
  tags: ['autodocs'],
  render: args => {
    return `
                <md-dropdown-list 
                    data-testid="md-dropdown-list"
                    items="${args.items}"
                    >
                </md-dropdown-list>`;
  },
  args: {
    items: '["Option 1", "Option 2", "Option 3"]',
  },
  argTypes: {
    items: {
      control: 'object',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdownList = canvas.getByTestId('md-dropdown-list');

    const shadowRoot = await waitFor(() => {
      const root = dropdownList.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      } else {
        return root;
      }
    });

    const mdSelectedOption = await waitFor(() => {
      const input = shadowRoot.querySelector('.md-selected-option');
      if (!input) {
        throw new Error('Selected option not found');
      } else {
        return input as HTMLInputElement;
      }
    });

    expect(mdSelectedOption).toHaveTextContent('Select an option');
    await userEvent.click(mdSelectedOption);
    await waitFor(() => {
      const mdDropdownOptions = shadowRoot.querySelector('.md-dropdown-options');
      expect(mdDropdownOptions).not.toBeNull();
    });
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
