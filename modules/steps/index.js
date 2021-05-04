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
        const renderLayout = () => {
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
                ${this.step === 1 ? html`<basket-step .handleStepChange=${handleStepChange.bind(this)}></basket-step>`: ``}
                ${this.step === 2 ? html`<delivery-step .handleStepChange=${handleStepChange.bind(this)}></delivery-step>`: ``}
                ${this.step === 3 ? html`<payment-step .handleStepChange=${handleStepChange.bind(this)}></payment-step>`: ``}
                ${this.step === 4 ? html`<confirmation-step></confirmation-step>`: ``}
            </div>
    
          </lion-steps>`;
            render(tmp, this);
        }
        const handleStepChange = (step) => {
            this.step = step;
            renderLayout();
        }
        renderLayout();
    }
}

customElements.define('steps-bar', Steps);
