import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'md-tab-panel',
  styleUrl: 'md-tab-panel.css',
  shadow: true,
})
export class MdTabPanel {
  @Prop() tabs: string = '[]';
  @State() activeTab: number = 0;

  get parsedTabs(): string[] {
    try {
      return JSON.parse(this.tabs);
    } catch (e) {
      console.error('Invalid JSON string for tabs:', this.tabs);
      return [];
    }
  }

  render() {
    return (
      <div class="md-tab-panel">
        <div class="md-tab-panel__tabs">
          {this.parsedTabs.map((tab, index) => (
            <button class={`md-tab-panel__tab ${index === this.activeTab ? 'active' : ''}`} onClick={() => (this.activeTab = index)}>
              {tab}
            </button>
          ))}
        </div>
        <div class="md-tab-panel__content">
          <slot name={`tab-${this.activeTab}`} />
        </div>
      </div>
    );
  }
}
