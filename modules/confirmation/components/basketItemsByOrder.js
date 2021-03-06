import { html, render } from '@lion/core';
import { getItemsByOrder } from '../../basket/utils';

class BasketItemsByOrder extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // fetch items ordered by attribute[orderBy]
        const itemsByOrder = getItemsByOrder(this.basketItems, this.orderBy);

        const tmp = html`
                ${Object.keys(itemsByOrder).map(order => order && html`
                    <h3>${order}</h3>
                    ${itemsByOrder[order].map(item => html`
                        <div class="basket-item">
                            <span>${item.quantity}X</span>
                            <span>${item.title}</span>
                            <small>${item.deliveryTime}</small>
                        </div>`
                    )}`
            )}
        `;
       
        render(tmp, this);
    }
}

customElements.define('basket-items-by-order', BasketItemsByOrder);
