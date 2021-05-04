import {html, render} from '../../node_modules/lit-html/lit-html.js';
import '../../modules/basket/index.js';
import '../../modules/payment/index.js';
import '../../modules/delivery/index.js';
import '../../modules/confirmation/index.js';

class Steps extends HTMLElement {
    constructor() {
        super();
        this.basketItems = [];
        this.deliveryAddress = [];
    }
    connectedCallback() {

        // fetch the basket items before rendering the steps
        fetch(`/assets/mocks/basket.json`).then(res => res.json()).then((res) => {
            this.basketItems = res?.basket;
            _render();
        }).catch(() => {
            _render();
        });

        // re-render the steps status after navigation between steps
        const handleStepChange = (step) => {
            this.step = step;
            _render();
        }

        // save the delivery address before proceed to payment
        const handleDeliveryAddress = (address) => {
            this.deliveryAddress = address;
            handleStepChange(3);
        }

        const _render = () => {
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
                    ${this.step === 1 ? html`<basket-step .basketItems=${this.basketItems} .handleStepChange=${handleStepChange.bind(this)}></basket-step>`: ``}
                    ${this.step === 2 ? html`<delivery-step .basketItems=${this.basketItems} .handleDeliveryAddress=${handleDeliveryAddress.bind(this)}></delivery-step>`: ``}
                    ${this.step === 3 ? html`<payment-step .basketItems=${this.basketItems} .handleStepChange=${handleStepChange.bind(this)}></payment-step>`: ``}
                    ${this.step === 4 ? html`<confirmation-step .deliveryAddress=${this.deliveryAddress} .basketItems=${this.basketItems}></confirmation-step>`: ``}
                </div>

            </lion-steps>`;

            render(tmp, this);
        }
    }
}

customElements.define('steps-bar', Steps);
