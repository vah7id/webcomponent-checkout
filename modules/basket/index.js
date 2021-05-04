import {html, render} from '../../node_modules/lit-html/lit-html.js';
import './item.js';

class Basket extends HTMLElement {
    constructor() {
        super();
        this.basketItems = [];
        this.basketSummary = null;
    }
    connectedCallback() {
        
        const confirmBasket = () => {
            this.handleStepChange(2);
        }
        
        fetch(`/assets/mocks/basket.json`).then(res => res.json()).then((res) => {
            this.basketItems = res?.basket;
            this.basketSummary = res?.basketSummary;
            _render();
        }).catch(() => {
            _render();
        });

        const _render = () => {
            const tmp = html`<div class="basket-wrapper">
            
            ${this.basketItems.map(item => html`<basket-item .item=${item}></basket-item`)}

            ${this.basketItems.length === 0 ? html`
                <h3>basket is empty</h3><button>Go to homepage</button>` : 
                html`<button @click=${confirmBasket}>Next step</button>`}
            </div>`;

            render(tmp, this);
        }
    }
}

customElements.define('basket-step', Basket);
