import '@lion/input-stepper/lion-input-stepper.js';
import { html, render } from '@lion/core';
import { LionInputStepper } from '@lion/input-stepper';  
import { MaxLength } from '@lion/form-core';
import { skuValidator } from './utils';

class BasketItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

        const updateQuantity = (e) => {
            this.item.quantity = e.currentTarget.value;
            this.updateItem(this.item);
            _render();
        }

        const _render = () => {
            const tmp = html`
            <div class="basket-item">
                
                <span>${this.item.quantity}x</span>
                <span>${this.item.title}</span>
                <small>${this.item.deliveryTime}</small>
                
                <button @click=${() => this.removeItem(this.item)} class="btn-delete">X Remove from basket</button>
    
                <lion-input-stepper 
                    class="input-stepper-wrapper"
                    step="1" 
                    min="1" 
                    name="quantity"
                    value=${this.item.quantity} 
                    max=${this.item.availableStock} 
                    @click=${(e) => updateQuantity(e)}
                    @keyup=${(e) => updateQuantity(e)}
                    .validators="${[
                        new MaxLength(1, { getMessage: ({ modelValue }) => skuValidator(this.item, modelValue) })
                    ]}">
                </lion-input-stepper>
                
            </div>`;
    
            render(tmp, this);
        }

        _render();
    }
}

customElements.define('basket-item', BasketItem);
