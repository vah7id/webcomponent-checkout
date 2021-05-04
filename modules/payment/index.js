import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Payment extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`<div class="payment-wrapper">
        Payment
        <div>
            <button @click=${() => this.handleStepChange(4)}>Confirm Payment</button>
        </div>`;
        render(tmp, this);
    }
}

customElements.define('payment-step', Payment);
