import { html, render } from '@lion/core';

import '../../modules/basket';
import '../../modules/payment';
import '../../modules/delivery';
import '../../modules/confirmation';
import './components/stepsTab';

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
        }).catch((err) => {
            //TODO: show general error notification
            _render();
        });

        // remove the item from basket
        const removeBasketItem = (item) => {
            const idx = this.basketItems.findIndex(_item => _item ? _item.productId === item.productId : false);
            if(idx > -1) {
                this.basketItems.splice(idx, 1);
            }
        }

        // update the item details in basket
        const updateBasketItem = (item) => {
            const idx = this.basketItems.findIndex(_item => _item ? _item.productId === item.productId : false);
            this.basketItems[idx] = item;
        }

        // save the delivery address in state
        const handleDeliveryAddress = (address) => {
            this.deliveryAddress = address;
            handleStepChange(3);
        }

        // re-render the steps status after navigation between steps
        const handleStepChange = (step) => {
            this.step = step;
            _render();
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
                            .handleStepChange=${handleStepChange}>
                        </basket-step>`: ``
                    }
                    ${this.step === 2 ? html`
                        <delivery-step 
                            .basketItems=${this.basketItems} 
                            .handleDeliveryAddress=${handleDeliveryAddress} 
                            .handleStepChange=${handleStepChange}>
                        </delivery-step>`: ``
                    }
                    ${this.step === 3 ? html`
                        <payment-step 
                            .basketItems=${this.basketItems} 
                            .handleStepChange=${handleStepChange}>
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
