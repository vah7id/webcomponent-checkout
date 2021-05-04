import {html, render} from '../../node_modules/lit-html/lit-html.js';

class PaymentOption extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`
            <div @click=${(e) => this.onSelect(e, this.option)} class="payment-option">
                <p>Pay with <b>${this.option.bank}</b> bank</p>
            </div>`;
        render(tmp, this);
    }
}

customElements.define('payment-option', PaymentOption);
