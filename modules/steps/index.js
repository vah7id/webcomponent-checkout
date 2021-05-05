import { html, render } from '@lion/core';

import '../../modules/basket';
import '../../modules/payment';
import '../../modules/delivery';
import '../../modules/confirmation';
import './stepsTab';

import { getBasketItems } from './actions';

class Steps extends HTMLElement {
    constructor() {
        super();
        this.basketItems = [];
        this.deliveryAddress = [];
    }
    connectedCallback() {

        // fetch the basket items before rendering the steps
        getBasketItems().then((res) => {
            this.basketItems = res?.basket;
            _render();
        }).catch(() => {
            _render();
        });

        const findIndexBasketItem = (item) => {
            return this.basketItems.findIndex(_item => _item ? _item.productId === item.productId : false);;
        }

        // remove the item from basket
        const removeBasketItem = (item) => {
            const idx = findIndexBasketItem(item);
            delete this.basketItems[idx];
        }

        // update the item details in basket
        const updateBasketItem = (item) => {
            const idx = findIndexBasketItem(item);
            this.basketItems[idx] = item;
        }

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
            const tmp = html`
            <lion-steps class="steps-wrapper">
                
                <steps-tab .step=${this.step}></steps-tab>
                
                <div class="step-container">
                    ${this.step === 1 ? html`
                        <basket-step 
                            .updateBasketItem=${updateBasketItem} 
                            .removeBasketItem=${removeBasketItem} 
                            .basketItems=${this.basketItems} 
                            .handleStepChange=${handleStepChange.bind(this)}>
                        </basket-step>`: ``
                    }
                    ${this.step === 2 ? html`
                        <delivery-step 
                            .basketItems=${this.basketItems} 
                            .handleDeliveryAddress=${handleDeliveryAddress.bind(this)} 
                            .handleStepChange=${handleStepChange.bind(this)}>
                        </delivery-step>`: ``
                    }
                    ${this.step === 3 ? html`
                        <payment-step 
                            .basketItems=${this.basketItems} 
                            .handleStepChange=${handleStepChange.bind(this)}>
                        </payment-step>`: ``
                    }
                    ${this.step === 4 ? html`
                        <confirmation-step 
                            .deliveryAddress=${this.deliveryAddress} 
                            .basketItems=${this.basketItems}>
                        </confirmation-step>`: ``}
                </div>
            </lion-steps>`;
            render(tmp, this);
        }
    }
}

customElements.define('steps-bar', Steps);
