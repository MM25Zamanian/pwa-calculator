/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, unsafeCSS } from 'lit';
import { customElement, queryAll, state } from 'lit/decorators.js';

import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import reboot from '../reboot.js';
import Calculator, { operator, other_actions } from '../utils/calculator.js';
import isNumeric from '../utils/numeric.js';

import '../components/calc-button.js';

@customElement('page-calculator')
export class PageCalculator extends PageElement {
  @queryAll('calc-button-component[label]')
  public buttons!: HTMLElement[];

  @state()
  public result!: string;

  public calculator = new Calculator();

  static styles = [
    unsafeCSS(reboot),
    css`
      :host {
        height: 100%;
      }
      section {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        padding: 1rem;

        min-height: calc(100vh - 56px);
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        width: calc(var(--button-size) * 4);
      }
      .sep {
        flex-grow: 1;
      }
    `,
  ];

  render() {
    return html`
      <section>
        <h1>${this.result}</h1>
        <div class="sep"></div>
        <div class="buttons">
          <calc-button-component
            label="AC"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="C"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="%"
            type="secondary"
          ></calc-button-component>
          <calc-button-component
            label="÷"
            value="/"
            type="primary"
          ></calc-button-component>

          <calc-button-component label="1"></calc-button-component>
          <calc-button-component label="2"></calc-button-component>
          <calc-button-component label="3"></calc-button-component>
          <calc-button-component
            label="×"
            value="*"
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
    this.calculator.onchange = () => {
      console.log(this.calculator.results_list);
      this.result = this.calculator.get_results_list().join(' ');
    };

    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = <operator | other_actions | number>(
          (
            button.getAttribute('value') || button.getAttribute('label')
          )?.toLowerCase()
        );

        if (value === '=') {
          this.calculator.submit();
        } else if (value === 'c') {
          this.calculator.clear();
        } else if (value === 'ac') {
          this.calculator.clearAll();
        } else {
          this.calculator.add(isNumeric(String(value)) ? Number(value) : value);
        }
      });
    });
  }

  meta() {
    return {
      title: config.appName,
      titleTemplate: null,
      description: config.appDescription,
    };
  }
}
