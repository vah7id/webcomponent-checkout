import { html, render } from '@lion/core';
import './components/basketItem';

class Basket extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        
        const removeItem = (e, item) => {
            this.removeBasketItem(item);
            e.currentTarget.parentNode.remove();
        }

        const updateItem = (item) => {
            this.updateBasketItem(item);
            _render();
        };

        const _render = () => {
            const tmp = html`
            <div class="basket-wrapper">
                ${this.basketItems.map(item => html`
                    <basket-item 
                        .updateItem=${updateItem} 
                        .removeItem=${(e) => removeItem(e, item)} 
                        .item=${item}>
                    </basket-item>`
                )}
                ${this.basketItems.filter(Boolean).length === 0 ? html`
                    <h3>BASKET IS EMPTY!! GO SHOPPING :)</h3><button>Go to homepage</button>` : 
                    html`<button @click=${() => this.handleStepChange(2)}>Next step</button>`
                }
            </div>`;
            render(tmp, this);
        }

        _render();
    }
}

customElements.define('basket-step', Basket);
