import type { Ripple } from '@material/mwc-ripple';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import reboot from '../reboot.js';

import '@material/mwc-ripple';

@customElement('calc-button-component')
export class CalcButton extends LitElement {
  @property({ type: Number })
  protected level = 1;

  @property()
  protected type: 'normal' | 'scondary' | 'primary' = 'normal';

  @property()
  protected label = '';

  @query('mwc-ripple')
  protected ripple!: Ripple;

  static styles = [
    unsafeCSS(reboot),
    css`
      :host {
        --mdc-icon-size: 26px;
      }

      .button-box {
        padding: 6px;
        height: var(--button-size);
        width: var(--button-size);
      }

      .button {
        position: relative;

        display: flex;

        width: 100%;
        height: 100%;

        align-items: center;
        justify-content: center;

        border-radius: 18px;
        border: 3px solid var(--mdc-theme);
        background-color: var(--mdc-theme);
        box-shadow: 6px 6px 32px #0003, -12px -12px 32px #fff8,
          inset -12px -12px 12px #fff4, inset 12px 12px 24px -2px #1111;

        user-select: none;

        overflow: hidden;
      }

      .button.secondary {
        border: 3px solid #bbb;
        background-color: #bbb;
        box-shadow: 6px 6px 32px #0003, -12px -12px 32px #fff8,
          inset -12px -12px 12px #fff2, inset 12px 12px 24px -2px #1111;
      }

      .button.primary {
        border: 3px solid var(--mdc-theme-primary);
        background-color: var(--mdc-theme-primary);
        box-shadow: 6px 6px 32px #0003, -12px -12px 32px #fff8,
          inset -12px -12px 26px -12px #fff4, inset 12px 12px 24px -2px #1111;
      }

      .button.primary > span.value {
        font-size: 28px;
        font-weight: 900px;
        color: #fff;
      }

      span.value {
        font-size: 20px;
        font-weight: 400px;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="button-box"
        style=${styleMap({
          width: String(`calc(var(--button-size) * ${String(this.level)});`),
        })}
      >
        <div
          class="button${classMap({ [this.type]: true })}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleMouseDown}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleTouchStart}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}"
        >
          <mwc-ripple></mwc-ripple>
          <span class="value">${this.label}</span>
        </div>
      </div>
    `;
  }

  handleRippleMouseDown(event: Event) {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);
      this.handleRippleDeactivate();
    };
    window.addEventListener('mouseup', onUp);
    this.ripple.startPress(event);
  }
  handleRippleTouchStart(event: Event) {
    this.ripple.startPress(event);
  }
  handleRippleDeactivate() {
    this.ripple.endPress();
  }
  handleRippleMouseEnter() {
    this.ripple.startHover();
  }
  handleRippleMouseLeave() {
    this.ripple.endHover();
  }
  handleRippleFocus() {
    this.ripple.startFocus();
  }
  handleRippleBlur() {
    this.ripple.endFocus();
  }
}
