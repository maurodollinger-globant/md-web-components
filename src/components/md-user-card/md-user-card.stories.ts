import { Meta, StoryObj } from '@storybook/html';
import { expect, waitFor, within } from '@storybook/test';

const meta: Meta = {
  title: 'MyDesignSystem/md-user-card',
  tags: ['autodocs'],
  render: args => {
    return `
            <md-user-card 
                data-testid="md-user-card"
                name="${args.name}"
                email="${args.email}"
                avatar="${args.avatar}"
                direction="${args.direction}"
                >
            </md-user-card>`;
  },
  args: {
    name: 'John Doe',
    email: 'john@doe',
    avatar: 'https://i.pravatar.cc/150?img=12',
    direction: 'vertical',
  },
  argTypes: {
    name: {
      control: {
        type: 'text',
      },
    },
    email: {
      control: {
        type: 'text',
      },
    },
    avatar: {
      control: {
        type: 'text',
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;

type Story = StoryObj;

export const DefaultVertical: Story = {
  args: {
    direction: 'vertical',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mdUserCard = canvas.getByTestId('md-user-card');

    const shadowRoot = await waitFor(() => {
      const root = mdUserCard.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      } else {
        return root;
      }
    });

    const avatar = await waitFor(() => {
      const img = shadowRoot.querySelector('.md-avatar');
      if (!img) {
        throw new Error('Avatar not found');
      } else {
        return img;
      }
    });

    const userInfo = await waitFor(() => {
      const div = shadowRoot.querySelector('.md-user-info');
      if (!div) {
        throw new Error('User Info not found');
      } else {
        return div;
      }
    });

    expect(avatar).toHaveAttribute('src', 'https://i.pravatar.cc/150?img=12');
    expect(avatar).toHaveAttribute('alt', 'User Avatar');
    expect(userInfo.querySelector('h2')).toHaveTextContent('John Doe');
    expect(userInfo.querySelector('p')).toHaveTextContent('john@doe');

    const userCard = await waitFor(() => {
      const div = shadowRoot.querySelector('.md-user-card');
      if (!div) {
        throw new Error('User Card not found');
      } else {
        return div;
      }
    });

    expect(userCard).toHaveClass('md-user-card-vertical');
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mdUserCard = canvas.getByTestId('md-user-card');

    const shadowRoot = await waitFor(() => {
      const root = mdUserCard.shadowRoot;
      if (!root) {
        throw new Error('ShadowRoot not found');
      } else {
        return root;
      }
    });

    const userCard = await waitFor(() => {
      const div = shadowRoot.querySelector('.md-user-card');
      if (!div) {
        throw new Error('User Card not found');
      } else {
        return div;
      }
    });

    expect(userCard).toHaveClass('md-user-card-horizontal');
  },
};
