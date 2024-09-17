import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'md-checkbox',
  styleUrl: 'md-checkbox.css',
  shadow: true,
})
export class MdCheckbox {
  @Prop({ reflect: true }) checked: boolean = false;

  @State() internalChecked: boolean;

  @Event() changeEvent: EventEmitter<boolean>;

  componentWillLoad() {
    this.internalChecked = this.checked;
  }

  toggleChecked() {
    this.internalChecked = !this.internalChecked;
    this.changeEvent.emit(this.internalChecked);
  }

  render() {
    return (
      <label class="md-checkbox">
        <input id="md-input-checkbox" type="checkbox" checked={this.internalChecked} onChange={() => this.toggleChecked()} />
        <label></label>
        <span>
          <slot></slot>
        </span>
      </label>
    );
  }
}
