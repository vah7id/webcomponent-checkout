import { html, render } from '@lion/core';
import './components/deliveryAddress';
import './components/basketItemsByOrder';

class Confirmation extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html
        `<div class="confirmation-wrapper">
            <h2>Thank you for placing your order!</h2>
            
            <basket-items-by-order 
                .orderBy=${'deliveryTime'} 
                .basketItems=${this.basketItems}>
            </basket-items-by-order>
            
            <delivery-address .deliveryAddress=${this.deliveryAddress}></delivery-address>
            
            <footer>
                <button>Go To Homepage</button>
            </footer>
        </div>`;
        render(tmp, this);
    }
}

customElements.define('confirmation-step', Confirmation);
