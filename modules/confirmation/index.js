import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Confirmation extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`<div class="confirmation-wrapper">
        Payment Confirmed
        <div>
            <button>Go to homepage</button>
        </div>`;
        render(tmp, this);
    }
}

customElements.define('confirmation-step', Confirmation);
