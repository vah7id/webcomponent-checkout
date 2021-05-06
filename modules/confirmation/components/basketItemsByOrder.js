import { html, render } from '@lion/core';

class BasketItemsByOrder extends HTMLElement {
    constructor() {
        super();
    }
    getItemsByOrder(items, orderBy) {
        let orderedItems = [];
        const orderSet = new Set(items.map(item => {
            return item[orderBy];
        }));
        // map all the items by orderSet unique keys
        Array.from(orderSet).map(order => {
            orderedItems[order] = items.filter(item => item[orderBy] !== order);
        });
        return orderedItems;
    }
    connectedCallback() {
        // fetch items ordered by attribute[orderBy]
        const itemsByOrder = this.getItemsByOrder(this.basketItems, this.orderBy);

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
