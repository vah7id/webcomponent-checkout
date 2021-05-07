import { html, render } from '@lion/core';
import './components/basketItem';
import { getItemsByOrder } from './utils';

class Basket extends HTMLElement {
    constructor() {
        super();
        this.orderBy = 'fulfillmentType';
    }
    connectedCallback() {
        
        const removeItem = (e, item) => {
            this.removeBasketItem(item);
            e.currentTarget.parentNode.remove();

            // show empty basket message after remove all items
            if(this.parentNode.querySelectorAll('.basket-item').length === 0) {
                this.querySelector('.basket-empty').style.display = 'block';
                _render();
            }
        }

        const updateItem = (item) => {
            this.updateBasketItem(item);
            _render();
        };

        const _render = () => {
            // order the basket items by fulfillmentType
            const basketItems = getItemsByOrder(this.basketItems, this.orderBy);
            
            const tmp = html`
            <div class="basket-wrapper">
                ${Object.keys(basketItems).map(fulfillmentType => html`
                    <h4>${fulfillmentType} ITEMS:<h4>
                    ${basketItems[fulfillmentType].map(item => html`
                        <basket-item 
                            .updateItem=${updateItem} 
                            .removeItem=${(e) => removeItem(e, item)} 
                            .item=${item}>
                        </basket-item>
                    `)}
                `)}
                <div class="basket-empty">
                    <h3>BASKET IS EMPTY :( GO SHOPPING!!!</h3>
                    <button>Go to homepage</button>
                </div>
                ${this.basketItems.length > 0 ? html`
                    <button @click=${() => this.handleStepChange(2)}>Next step</button>` : ``}
            </div>`;
            render(tmp, this);
        }

        _render();
    }
}

customElements.define('basket-step', Basket);
