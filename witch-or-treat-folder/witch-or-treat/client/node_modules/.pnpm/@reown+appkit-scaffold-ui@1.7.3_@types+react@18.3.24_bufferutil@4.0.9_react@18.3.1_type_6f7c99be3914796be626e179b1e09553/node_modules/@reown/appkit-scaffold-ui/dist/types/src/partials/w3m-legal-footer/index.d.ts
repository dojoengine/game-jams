import { LitElement } from 'lit';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-ux-by-reown';
export declare class W3mLegalFooter extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1> | null;
    private andTemplate;
    private termsTemplate;
    private privacyTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-legal-footer': W3mLegalFooter;
    }
}
