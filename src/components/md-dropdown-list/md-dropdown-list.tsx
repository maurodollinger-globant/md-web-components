import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'md-dropdown-list',
  styleUrl: 'md-dropdown-list.css',
  shadow: true,
})
export class MDDropdownList {
  @Prop() items: string[] = ['Option 1', 'Option 2', 'Option 3'];
  @State() isOpen = false;
  @State() selectedOption: string | undefined;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }

  render() {
    return (
      <div class="md-dropdown-list">
        <div class="md-selected-option" onClick={() => this.toggleDropdown()}>
          {this.selectedOption ? this.selectedOption : 'Select an option'}
        </div>
        {this.isOpen && (
          <ul class="md-dropdown-options">
            {this.items.map(item => (
              <li onClick={() => this.selectOption(item)}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
