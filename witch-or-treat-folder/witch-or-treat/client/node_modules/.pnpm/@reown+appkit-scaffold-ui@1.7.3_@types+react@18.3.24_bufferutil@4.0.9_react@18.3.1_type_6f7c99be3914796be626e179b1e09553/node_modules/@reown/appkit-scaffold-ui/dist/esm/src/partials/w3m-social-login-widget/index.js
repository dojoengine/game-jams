var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectorController, ConstantsUtil, OptionsController, RouterController } from '@reown/appkit-controllers';
import { executeSocialLogin } from '@reown/appkit-controllers/utils';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-social';
import '@reown/appkit-ui/wui-logo-select';
import styles from './styles.js';
const MAX_TOP_VIEW = 2;
const MAXIMUM_LENGTH = 6;
let W3mSocialLoginWidget = class W3mSocialLoginWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.walletGuide = 'get-started';
        this.tabIdx = undefined;
        this.connectors = ConnectorController.state.connectors;
        this.features = OptionsController.state.features;
        this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => {
            this.connectors = val;
            this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        }), OptionsController.subscribeKey('features', val => (this.features = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `;
    }
    topViewTemplate() {
        const isCreateWalletPage = this.walletGuide === 'explore';
        let socials = this.features?.socials;
        if (!socials && isCreateWalletPage) {
            socials = ConstantsUtil.DEFAULT_FEATURES.socials;
            return this.renderTopViewContent(socials);
        }
        if (!socials) {
            return null;
        }
        return this.renderTopViewContent(socials);
    }
    renderTopViewContent(socials) {
        if (socials.length === 2) {
            return html ` <wui-flex gap="xs">
        ${socials.slice(0, MAX_TOP_VIEW).map(social => html `<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
                this.onSocialClick(social);
            }}
              logo=${social}
              tabIdx=${ifDefined(this.tabIdx)}
            ></wui-logo-select>`)}
      </wui-flex>`;
        }
        return html ` <wui-list-social
      data-testid=${`social-selector-${socials[0]}`}
      @click=${() => {
            this.onSocialClick(socials[0]);
        }}
      logo=${ifDefined(socials[0])}
      align="center"
      name=${`Continue with ${socials[0]}`}
      tabIdx=${ifDefined(this.tabIdx)}
    ></wui-list-social>`;
    }
    bottomViewTemplate() {
        let socials = this.features?.socials;
        const isCreateWalletPage = this.walletGuide === 'explore';
        const isSocialDisabled = !this.authConnector || !socials || !socials?.length;
        if (isSocialDisabled && isCreateWalletPage) {
            socials = ConstantsUtil.DEFAULT_FEATURES.socials;
        }
        if (!socials) {
            return null;
        }
        if (socials.length <= MAX_TOP_VIEW) {
            return null;
        }
        if (socials && socials.length > MAXIMUM_LENGTH) {
            return html `<wui-flex gap="xs">
        ${socials.slice(1, MAXIMUM_LENGTH - 1).map(social => html `<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
                this.onSocialClick(social);
            }}
              logo=${social}
              tabIdx=${ifDefined(this.tabIdx)}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${ifDefined(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
        ></wui-logo-select>
      </wui-flex>`;
        }
        if (!socials) {
            return null;
        }
        return html `<wui-flex gap="xs">
      ${socials.slice(1, socials.length).map(social => html `<wui-logo-select
            data-testid=${`social-selector-${social}`}
            @click=${() => {
            this.onSocialClick(social);
        }}
            logo=${social}
            tabIdx=${ifDefined(this.tabIdx)}
          ></wui-logo-select>`)}
    </wui-flex>`;
    }
    onMoreSocialsClick() {
        RouterController.push('ConnectSocials');
    }
    async onSocialClick(socialProvider) {
        const isAvailableChain = CommonConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(chain => chain === ChainController.state.activeChain);
        if (!isAvailableChain) {
            const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
            if (caipNetwork) {
                RouterController.push('SwitchNetwork', { network: caipNetwork });
                return;
            }
        }
        if (socialProvider) {
            await executeSocialLogin(socialProvider);
        }
    }
};
W3mSocialLoginWidget.styles = styles;
__decorate([
    property()
], W3mSocialLoginWidget.prototype, "walletGuide", void 0);
__decorate([
    property()
], W3mSocialLoginWidget.prototype, "tabIdx", void 0);
__decorate([
    state()
], W3mSocialLoginWidget.prototype, "connectors", void 0);
__decorate([
    state()
], W3mSocialLoginWidget.prototype, "features", void 0);
__decorate([
    state()
], W3mSocialLoginWidget.prototype, "authConnector", void 0);
W3mSocialLoginWidget = __decorate([
    customElement('w3m-social-login-widget')
], W3mSocialLoginWidget);
export { W3mSocialLoginWidget };
//# sourceMappingURL=index.js.map