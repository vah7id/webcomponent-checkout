import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Delivery extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`<div class="delivery-wrapper">
            Delivery information
            <div>
                <button @click=${() => this.handleStepChange(3)}>Next step</button>
                <button @click=${() => this.handleStepChange(1)}>previous step</button>
            </div>`;
        render(tmp, this);
    }
}

customElements.define('delivery-step', Delivery);
