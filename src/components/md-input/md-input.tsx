import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'md-input',
  styleUrl: 'md-input.css',
  shadow: true,
})
export class MdInput {
  @Prop() value: string;
  @Prop() placeholder: string = 'Placeholder';
  @Prop() disabled: boolean;

  @State() internalValue: string;

  @Event() changeEvent: EventEmitter<string>;

  componentWillLoad() {
    this.internalValue = this.value;
  }

  handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.internalValue = inputElement.value;
    this.changeEvent.emit(this.internalValue);
  }

  render() {
    return (
      <input
        type="text"
        class={{
          'md-input': true,
          'md-input--disabled': this.disabled,
        }}
        value={this.internalValue}
        placeholder={this.placeholder}
        disabled={this.disabled}
        onInput={(event: Event) => this.handleInputChange(event)}
      />
    );
  }
}
