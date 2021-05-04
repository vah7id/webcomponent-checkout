import {html, render} from '../../node_modules/lit-html/lit-html.js';

class BasketItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`<div class="basket-item">
            <span>${this.item.quantity}X</span>
            <span>${this.item.title}</span>
            <small>${this.item.deliveryTime}</small>
        </div>`;
        render(tmp, this);
    }
}

customElements.define('basket-item', BasketItem);
