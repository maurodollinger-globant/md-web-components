import { Meta, StoryObj } from '@storybook/html';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-tab-panel ',
  tags: ['autodocs'],
  args: {
    tabs: '["Tab 1", "Tab 2", "Tab 3"]',
  },
  argTypes: {
    tabs: {
      description: 'The tabs to display',
      control: {
        type: 'text',
      },
    },
  },
  render: args => {
    return `
      <md-tab-panel data-testid="md-tab-panel" tabs='${args.tabs}'>
        <div slot="tab-0">Tab 1 content</div>
        <div slot="tab-1">Tab 2 content</div>
        <div slot="tab-2">Tab 3 content</div>
      </md-tab-panel>
    `;
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

export const TestTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabPanel = canvas.getByTestId('md-tab-panel');

    const shadowRoot = await waitFor(() => {
      const root = tabPanel.shadowRoot;
      if (root) {
        return root;
      } else {
        throw new Error('Shadow root not found');
      }
    });

    const buttonTab1 = await waitFor(() => {
      const bt = shadowRoot.querySelector('.md-tab-panel__tab:nth-child(1)');
      if (bt) {
        return bt;
      } else {
        throw new Error('Button not found');
      }
    });

    await userEvent.click(buttonTab1);
    expect(buttonTab1).toHaveClass('active');
    expect(canvas.getByText('Tab 1 content')).toBeVisible();

    const buttonTab2 = await waitFor(() => {
      const bt = shadowRoot.querySelector('.md-tab-panel__tab:nth-child(2)');
      if (bt) {
        return bt;
      } else {
        throw new Error('Button not found');
      }
    });

    await userEvent.click(buttonTab2);
    expect(buttonTab2).toHaveClass('active');
    expect(canvas.getByText('Tab 2 content')).toBeVisible();

    const buttonTab3 = await waitFor(() => {
      const bt = shadowRoot.querySelector('.md-tab-panel__tab:nth-child(3)');
      if (bt) {
        return bt;
      } else {
        throw new Error('Button not found');
      }
    });

    await userEvent.click(buttonTab3);
    expect(buttonTab3).toHaveClass('active');
    expect(canvas.getByText('Tab 3 content')).toBeVisible();
  },
};
