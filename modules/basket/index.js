import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Basket extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`basket is empty`;
        render(tmp, this);
    }
}

customElements.define('basket-step', Basket);
