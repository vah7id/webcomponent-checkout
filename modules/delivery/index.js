import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Delivery extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`delivery`;
        render(tmp, this);
    }
}

customElements.define('delivery-step', Delivery);
