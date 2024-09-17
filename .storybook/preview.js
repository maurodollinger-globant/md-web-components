import { defineCustomElements } from '../dist/esm/loader';

defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    story => `
      <style>
        :root {
          --md-font-family: sans-serif;
          --md-color-primary: #6200ee;
          --md-color-secondary: #03dac6;
          --md-button-color-disabled: #e0e0e0;
          --md-text-primary: #2f2044;
        }
      </style>
      ${story()}
    `,
  ],
};

export default preview;
