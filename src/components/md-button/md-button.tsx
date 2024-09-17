import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'md-button',
  styleUrl: 'md-button.css',
  shadow: true,
})
export class MdButton {
  @Prop() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled: boolean;
  @Event() buttonClick: EventEmitter<void>;

  handleClick() {
    this.buttonClick.emit();
  }

  render() {
    const buttonClasses = {
      'md-button': this.size === 'medium',
      'md-button md-button-small': this.size === 'small',
      'md-button md-button-medium': this.size === 'medium',
      'md-button md-button-large': this.size === 'large',
    };

    return (
      <button type={this.buttonType} class={buttonClasses} disabled={this.disabled} onClick={this.handleClick.bind(this)}>
        <slot></slot>
      </button>
    );
  }
}
