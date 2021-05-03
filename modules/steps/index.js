import {html, render} from '../../node_modules/lit-html/lit-html.js';
import '../../modules/basket/index.js';
import '../../modules/payment/index.js';
import '../../modules/delivery/index.js';
import '../../modules/confirmation/index.js';

class Steps extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`<lion-steps class="steps-wrapper">
        <lion-step class="step-item" initial-step>
            <label class=${this.step === 1 ? 'step-active' : ''}>1 Basket</label>
        </lion-step>
        <lion-step class="step-item">
            <label class=${this.step === 2 ? 'step-active' : ''}>2 Delivery</label>
        </lion-step>
        <lion-step class="step-item">
            <label class=${this.step === 3 ? 'step-active' : ''}>3 Payment</label>
        </lion-step>
        <lion-step class="step-item">
            <label class=${this.step === 4 ? 'step-active' : ''}>4 Confirmation</label>
        </lion-step>

        <div class="step-container">
            ${this.step === 1 ? html`<basket-step></basket-step>`: ``}
            ${this.step === 2 ? html`<basket-step></basket-step>`: ``}
            ${this.step === 3 ? html`<basket-step></basket-step>`: ``}
            ${this.step === 4 ? html`<basket-step></basket-step>`: ``}
        </div>

      </lion-steps>`;
        render(tmp, this);
    }
}

customElements.define('steps-bar', Steps);
