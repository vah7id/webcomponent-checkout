import '@lion/input-stepper/lion-input-stepper.js';
import { html, render } from '@lion/core';
import { LionInputStepper } from '@lion/input-stepper';  
import { MaxLength, MinMaxLength } from '@lion/form-core';

class BasketItem extends HTMLElement {
    constructor() {
        super();
    }
    skuValidator(modelValue) {
        return modelValue > this.item.availableStock ? 'OUT OF STOCK' : ''
    }
    connectedCallback() {

        const updateQuantity = (e) => {
            this.item.quantity = e.currentTarget.value;
            this.updateItem(this.item);
            _render();
        }

        const _render = () => {
            console.log(this.item)
            const tmp = html`
            <div class="basket-item">
                
                <span>${this.item.quantity}x</span>
                <span>${this.item.title}</span>
                <small>${this.item.deliveryTime}</small>
                
                <button @click=${() => this.removeItem(this.item)} class="btn-delete">X Remove from basket</button>
    
                <lion-input-stepper 
                    class="input-stepper-wrapper"
                    .validators="${[
                        new MaxLength(1, { getMessage: ({ modelValue }) => this.skuValidator(modelValue) })
                    ]}"
                    value=${this.item.quantity} 
                    max=${this.item.availableStock} 
                    @click=${(e) => updateQuantity(e)}
                    @keyup=${(e) => updateQuantity(e)}
                    step="1" 
                    min="1" 
                    name="quantity">
                </lion-input-stepper>
                
            </div>`;
    
            render(tmp, this);
        }

        _render();
    }
}

customElements.define('basket-item', BasketItem);
