# MD Web Components Project

This project demonstrates the use of various custom web components, including buttons, text inputs, checkboxes, user cards, dropdown lists, modals, and tab panels.

This project is built with stencil.js and it use storybook for displaying and testing.

## Contents

- [Installation](#installation)
- [Components](#components)
- [Styles](#styles)
- [Usage](#usage)

## Installation

1. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/maurodollinger-globant/md-web-components.git
   ```
2. Navigate to the project directory:
   ```sh
   cd md-web-components
   ```
3. Run npm install

4. Run npm run storybook

## Components

### md-button

A custom button that can be styled and used to trigger events.

### md-input

A text input field with custom events.

### md-checkbox

A checkbox with custom styles.

### md-user-card

A user card that displays information such as name, email, and avatar.

### md-dropdown-list

A dropdown list for selecting options.

### md-modal

A modal that can be opened and closed via events.

### md-tab-panel

A tab panel containing multiple sections of content.

## Styles

Custom styles for the components are defined in the `index.html` file using CSS variables:

```css
--md-color-primary: #6200ee;
--md-color-secondary: #03dac6;
--md-color-primary-alt: #717171;
--md-button-color-disabled: #e0e0e0;
--md-button-background-color: #f5f5f5;
--md-button-background-color-hover: #e0e0e0;
--md-button-background-color-active: #d5d5d5;
--md-text-primary: #2f2044;
--md-color-checked: #6200ee;
--md-checkbox-shadow: 1px 1px 0 1px #6300ee3e;
```

## Usage

import both js files:
```
  <script type="module" src="/build/md-components.esm.js"></script>
  <script nomodule src="/build/md-components.js"></script>
```

```
<div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem">

  <md-button>my button</md-button>

  <md-input placeholder="Placeholder"></md-input>

  <md-checkbox>My checkbox</md-checkbox>

  <md-user-card direction="vertical" name="John Doe" email="john@doe.com" avatar="https://i.pravatar.cc/150?img=12"></md-user-card>

  <md-dropdown-list></md-dropdown-list>

  <md-modal>This is the modal content</md-modal>

  <md-tab-panel tabs='["Tab 1", "Tab 2", "Tab 3"]'>
    <div slot="tab-0" class="tab-content">Content for Tab 1</div>
    <div slot="tab-1" class="tab-content">Content for Tab 2</div>
    <div slot="tab-2" class="tab-content">Content for Tab 3</div>
  </md-tab-panel>

</div>
```
