/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, unsafeCSS } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';

import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import reboot from '../reboot.js';

import '../components/calc-button.js';

@customElement('page-calculator')
export class PageCalculator extends PageElement {
  @queryAll('calc-button-component[label]')
  public buttons!: HTMLElement[];

  static styles = [
    unsafeCSS(reboot),
    css`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        width: calc(var(--button-size) * 4);
      }
    `,
  ];

  render() {
    return html`
      <section>
        <div class="buttons">
          <calc-button-component
            label="C"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="+/-"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="%"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="÷"
            type="primary"
          ></calc-button-component>

          <calc-button-component label="1"></calc-button-component>
          <calc-button-component label="2"></calc-button-component>
          <calc-button-component label="3"></calc-button-component>
          <calc-button-component
            label="×"
            type="primary"
          ></calc-button-component>

          <calc-button-component label="4"></calc-button-component>
          <calc-button-component label="5"></calc-button-component>
          <calc-button-component label="6"></calc-button-component>
          <calc-button-component
            label="-"
            type="primary"
          ></calc-button-component>

          <calc-button-component label="7"></calc-button-component>
          <calc-button-component label="8"></calc-button-component>
          <calc-button-component label="9"></calc-button-component>
          <calc-button-component
            label="+"
            type="primary"
          ></calc-button-component>

          <calc-button-component label="0" level="2"></calc-button-component>
          <calc-button-component label="."></calc-button-component>
          <calc-button-component
            label="="
            type="primary"
          ></calc-button-component>
        </div>
      </section>
    `;
  }

  protected firstUpdated(): void {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        console.log(button.getAttribute('label'));
      });
    });
  }

  meta() {
    return {
      title: 'calculator',
      description: config.appDescription,
    };
  }
}
