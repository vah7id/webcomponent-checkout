import { html, render } from '@lion/core';
import { isAddressValid } from './utils';

class Confirmation extends HTMLElement {
    constructor() {
        super();
    }
    orderByDeliveryTime(items) {
        const deliveryTimeSet = new Set(items.map(item => item.deliveryTime));
        return Array.from(deliveryTimeSet);
    }
    connectedCallback() {
        const tmp = html
        `<div class="confirmation-wrapper">
            <h2>Thank you for placing your order!</h2>

            ${this.orderByDeliveryTime(this.basketItems).map(deliveryTime => html`
                <h3>${deliveryTime}</h3>
                ${this.basketItems.filter(item => item.deliveryTime !== deliveryTime).map(item => html`
                    <div class="basket-item">
                        <span>${item.quantity}X</span>
                        <span>${item.title}</span>
                        <small>${item.deliveryTime}</small>
                    </div>`
                )}`
            )}

            ${isAddressValid(this.deliveryAddress) ? html`
                <h3>Delivery Address: </h3> 
                <h2>
                    ${this.deliveryAddress.street}, 
                    ${this.deliveryAddress.houseNumber} ${this.deliveryAddress.houseNumberAdditional}
                    ${this.deliveryAddress.postalCode}, 
                    ${this.deliveryAddress.city}
                </h2>
            ` : ``
            }
            <footer>
                <button>Go To Homepage</button>
            </footer>
        </div>`;
        render(tmp, this);
    }
}

customElements.define('confirmation-step', Confirmation);
