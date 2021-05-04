import {html, render} from '../../node_modules/lit-html/lit-html.js';

class Basket extends HTMLElement {
    constructor() {
        super();
        this.basketItems = [];
    }
    connectedCallback() {
        const confirmBasket = () => {
            this.handleStepChange(2);
        }
        const tmp = html`<div class="basket-wrapper">
            ${this.basketItems.length !== 0 ? html`
                <h3>basket is empty</h3><button>Go to homepage</button>` : 
                html`<button @click=${confirmBasket}>Next step</button>`}
            </div>`;
        render(tmp, this);
    }
}

customElements.define('basket-step', Basket);
