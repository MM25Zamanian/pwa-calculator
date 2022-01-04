import type { Drawer } from '@material/mwc-drawer';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import config from '../config.js';
import reboot from '../reboot.js';
import { attachRouter, router } from '../router/index.js';
import { routes } from '../router/routes.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

import '@webcomponents/webcomponentsjs/webcomponents-loader.js';

import '@material/mwc-icon/mwc-icon.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-drawer/mwc-drawer.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon-button/mwc-icon-button.js';
import '@material/mwc-top-app-bar/mwc-top-app-bar.js';
import '@material/mwc-circular-progress-four-color/mwc-circular-progress-four-color.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  @query('mwc-drawer')
  protected drawer!: Drawer;

  @property()
  public app_title = config.appName;

  @property({ type: Boolean })
  public loader = true;

  @state()
  private location;

  constructor() {
    super();
    this.location = router.location.pathname;

    window.addEventListener('load', () => {
      this.loader = false;
    });

    window.addEventListener('vaadin-router-location-changed', () => {
      this.loader = false;
      this.location = router.location.pathname;
    });
  }

  static styles = [
    unsafeCSS(reboot),
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .flex {
        display: flex;
      }

      .flex-col {
        flex-direction: column;
      }

      main,
      main > * {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      mwc-drawer mwc-list-item {
        margin: 8px;
        border-radius: 6px;
      }

      mwc-drawer mwc-list-item:first-of-type {
        margin-top: 4px;
      }

      mwc-drawer mwc-list-item:last-of-type {
        margin-bottom: 4px;
      }
    `,
    css`
      .desktop-forbidden {
        position: fixed;
        z-index: 64;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
        background-color: var(--mdc-theme-primary);
      }

      .desktop-forbidden .title {
        color: #fff;
        font-weight: 100;
        font-size: 3rem;
        transition: text-shadow 300ms ease;
      }

      @media (orientation: portrait) {
        .desktop-forbidden {
          display: none;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="desktop-forbidden">
        <span class="title"
          >Unfortunately, this application is only for mobile devices</span
        >
      </div>
      <mwc-drawer hasHeader type="modal">
        <span slot="title">${config.appName}</span>
        <span slot="subtitle">${config.appDescription}</span>
        <div>
          <mwc-list activatable>
            ${routes
              .filter((item) => item.show_on_nav)
              .map(
                (item) => html`
                  <mwc-list-item
                    graphic="avatar"
                    ?activated="${this.isActiveUrl(item.path)}"
                    ?selected="${this.isActiveUrl(item.path)}"
                    @click="${() => this.routerRender(item.path)}"
                  >
                    <span>${item.label}</span>
                    <mwc-icon slot="graphic">${item.icon}</mwc-icon>
                  </mwc-list-item>
                `
              )}
            <li divider role="separator"></li>
          </mwc-list>
          <mwc-list>
            <pwa-install-button>
              <mwc-list-item graphic="avatar">
                <span>Install</span>
                <mwc-icon slot="graphic">file_download</mwc-icon>
              </mwc-list-item>
            </pwa-install-button>
            <pwa-update-available>
              <mwc-list-item graphic="avatar">
                <span>Upgrade</span>
                <mwc-icon slot="graphic">update</mwc-icon>
              </mwc-list-item>
            </pwa-update-available>
          </mwc-list>
        </div>
        <div slot="appContent">
          <mwc-top-app-bar centerTitle dir="ltr">
            <mwc-icon-button
              slot="navigationIcon"
              icon="menu"
            ></mwc-icon-button>
            <div slot="title">${this.app_title}</div>
            <mwc-circular-progress-four-color
              indeterminate
              slot="actionItems"
              ?closed=${!this.loader}
            ></mwc-circular-progress-four-color>
          </mwc-top-app-bar>
          <main role="main"></main>
        </div>
      </mwc-drawer>
    `;
  }

  protected isActiveUrl(path: string) {
    return router.urlForPath(path) === this.location;
  }

  protected async routerRender(path: string) {
    this.loader = true;
    this.drawer.open = false;
    await router.render(path, true);
    this.loader = false;
  }

  protected async firstUpdated() {
    attachRouter(this.main);

    const container = <HTMLElement>this.drawer.parentNode;
    container.addEventListener('MDCTopAppBar:nav', () => {
      this.drawer.open = !this.drawer.open;
    });
  }
}
