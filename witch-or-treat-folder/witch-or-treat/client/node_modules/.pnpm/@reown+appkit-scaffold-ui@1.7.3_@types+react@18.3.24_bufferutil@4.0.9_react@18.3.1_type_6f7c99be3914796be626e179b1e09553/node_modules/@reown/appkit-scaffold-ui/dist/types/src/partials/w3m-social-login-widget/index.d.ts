import { LitElement } from 'lit';
import { type SocialProvider, type WalletGuideType } from '@reown/appkit-controllers';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-social';
import '@reown/appkit-ui/wui-logo-select';
export declare class W3mSocialLoginWidget extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    walletGuide: WalletGuideType;
    tabIdx?: number;
    private connectors;
    private features;
    private authConnector;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private topViewTemplate;
    private renderTopViewContent;
    private bottomViewTemplate;
    onMoreSocialsClick(): void;
    onSocialClick(socialProvider?: SocialProvider): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-social-login-widget': W3mSocialLoginWidget;
    }
}
