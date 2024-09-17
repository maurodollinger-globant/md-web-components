import { Component, h, Prop, Event, EventEmitter, Method, State } from '@stencil/core';

@Component({
  tag: 'md-modal',
  styleUrl: 'md-modal.css',
  shadow: true,
})
export class MdModal {
  @Prop() isOpen: boolean = false;
  @Prop({ reflect: true }) modalTitle: string = 'My modal title';
  @State() internalIsOpen: boolean = false;
  @Event() closeModal: EventEmitter<void>;

  componentWillLoad() {
    this.internalIsOpen = this.isOpen;
  }

  @Method()
  async open() {
    this.internalIsOpen = true;
  }

  @Method()
  async close() {
    this.internalIsOpen = false;
  }

  render() {
    return (
      <div class={`md-modal-container ${this.internalIsOpen ? 'open' : ''}`}>
        <div class="md-modal-backdrop" onClick={() => this.close()}></div>
        <div class="md-modal">
          <div class="md-modal-content">
            <h2 class="md-modal-title">{this.modalTitle}</h2>
            <slot></slot>
            <div class="md-modal-actions">
              <md-button onClick={() => this.close()}>Close</md-button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
