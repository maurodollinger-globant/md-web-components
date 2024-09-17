import type { Meta, StoryObj } from '@storybook/html';
import { expect, within } from '@storybook/test';

type ButtonArgs = {
  buttonType: 'button' | 'submit' | 'reset';
  size: 'small' | 'medium' | 'large';
  label: string;
  buttonClick: () => void;
};

const meta: Meta<ButtonArgs> = {
  title: 'MyDesignSystem/md-button',
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    label: {
      control: {
        type: 'text',
      },
    },
    buttonClick: {
      description: 'Event emitted when the button is clicked',
    },
  },
  args: {
    label: 'Button',
    buttonType: 'button',
    size: 'medium',
  },
  render: args => {
    return `<md-button data-testid="md-button" type="${args.buttonType}" size="${args.size}">${args.label}</md-button>`;
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('md-button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveTextContent('Button');
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const MediumDefault: Story = {
  args: {
    size: 'medium',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('md-button');
    expect(button).toHaveAttribute('size', 'medium');
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('md-button');
    expect(button).toHaveAttribute('size', 'small');
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('md-button');
    expect(button).toHaveAttribute('size', 'large');
  },
};
