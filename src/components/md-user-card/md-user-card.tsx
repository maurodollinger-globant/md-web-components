import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'md-user-card',
  styleUrl: 'md-user-card.css',
  shadow: true,
})
export class MdUserCard {
  @Prop() name: string = 'John Doe';
  @Prop() email: string = 'john@doe.com';
  @Prop() avatar: string;
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';

  @Event() cardClicked: EventEmitter<void>;

  render() {
    let usercardClasses: string;
    if (this.direction === 'horizontal') {
      usercardClasses = 'md-user-card md-user-card-horizontal';
    } else if (this.direction === 'vertical') {
      usercardClasses = 'md-user-card md-user-card-vertical';
    }
    return (
      <div class={usercardClasses} onClick={() => this.cardClicked.emit()}>
        <img class="md-avatar" src={this.avatar} alt="User Avatar" />
        <div class="md-user-info">
          <h2>{this.name}</h2>
          <p>{this.email}</p>
        </div>
      </div>
    );
  }
}
