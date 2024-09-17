import { Meta, StoryObj } from '@storybook/html';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-modal',
  tags: ['autodocs'],
  render: args => {
    return `
        <script>
            const button = document.querySelector('md-button');
            const modal = document.querySelector('md-modal');
            button.addEventListener('click', () => {
                modal.open();
            });
        </script>
        <md-button data-testid="md-button">Open modal</md-button>
        <md-modal data-testid="md-modal" is-open="${args.isOpen}" modal-title="${args.modalTitle}">
            <p>My modal content</p>
        </md-modal>
    `;
  },
  args: {
    isOpen: false,
    modalTitle: 'My modal title',
  },
  argTypes: {
    isOpen: {
      description: 'Whether the modal is open or not',
      control: {
        type: 'boolean',
      },
    },
    modalTitle: {
      description: 'The title of the modal',
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    story => `
    <style>
      :root {
        --md-button-background-color: #f5f5f5;
        --md-button-background-color-hover: #e0e0e0;
        --md-button-background-color-active: #d5d5d5;
      }
    </style>
    ${story()}
  `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const TestActions: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const modal = canvas.getByTestId('md-modal');

    expect(modal).toHaveAttribute('is-open', args.isOpen.toString());
    expect(modal).toHaveAttribute('modal-title', args.modalTitle);

    const shadowRoot = await waitFor(() => {
      const root = modal.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      } else {
        return root;
      }
    });

    const openButton = canvas.getByTestId('md-button');
    await userEvent.click(openButton);

    await waitFor(() => {
      const modalContainer = shadowRoot.querySelector('.md-modal-container');
      expect(modalContainer).toHaveClass('open');
    });

    const button = await waitFor(() => {
      const el = shadowRoot.querySelector('md-button');
      if (!el) {
        throw new Error('Button not found');
      } else {
        return el;
      }
    });

    await userEvent.click(button);

    await waitFor(() => {
      const modalContainer = shadowRoot.querySelector('.md-modal-container');
      expect(modalContainer).not.toHaveClass('open');
    });
  },
};
