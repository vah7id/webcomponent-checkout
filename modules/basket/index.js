import {html, render} from '../../node_modules/lit-html/lit-html.js';
import './item.js';

class Basket extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        
        const confirmBasket = () => {
            this.handleStepChange(2);
        }

        const _render = () => {
            const tmp = html`<div class="basket-wrapper">
            
            ${this.basketItems.map(item => html`<basket-item .item=${item}></basket-item>`)}

            ${this.basketItems.length === 0 ? html`
                <h3>basket is empty</h3><button>Go to homepage</button>` : 
                html`<button @click=${confirmBasket}>Next step</button>`}
            </div>`;

            render(tmp, this);
        }

        _render();
    }
}

customElements.define('basket-step', Basket);
