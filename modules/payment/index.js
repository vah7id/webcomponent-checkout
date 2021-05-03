import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Payment extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`payment`;
        render(tmp, this);
    }
}

customElements.define('payment-step', Payment);
