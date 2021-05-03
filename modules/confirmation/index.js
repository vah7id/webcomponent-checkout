import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Confirmation extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`confirmation`;
        render(tmp, this);
    }
}

customElements.define('confirmation-step', Confirmation);
