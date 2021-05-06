import { html, render } from '@lion/core';
import { isAddressValid } from '../utils';

class DeliveryAddress extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`
            ${isAddressValid(this.deliveryAddress) ? html`
            <h3>Delivery Address: </h3> 
            <h2>
                ${this.deliveryAddress.street}, 
                ${this.deliveryAddress.houseNumber} ${this.deliveryAddress.houseNumberAdditional}
                ${this.deliveryAddress.postalCode}, 
                ${this.deliveryAddress.city}
            </h2>` : ``}
        `;
        render(tmp, this);
    }
}

customElements.define('delivery-address', DeliveryAddress);
