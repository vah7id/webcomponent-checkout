import { html, render } from '@lion/core';

class AddressFields extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`
            <form name="addressFields">
                <lion-input type="text" .value=${this.customer.fullname} name="fullname" placeholder="Full name"></lion-input>
                <lion-input type="email" .value=${this.customer.email} name="email" placeholder="Email" ></lion-input>
                ${!this.hasVoucher ? html`
                <lion-input type="text" .value=${this.customer.address.street} id="street" name="street" placeholder="Street" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumber} id="houseNumber" name="houseNumber" placeholder="House number" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumberAddition} id="houseNumberAddition" name="houseNumberAddition" placeholder="Additional House Number" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.postalCode} id="postalCode" name="postalCode" placeholder="Postal Code" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.city} id="city" name="city" placeholder="City" ></lion-input>` : ``}
                <lion-input type="text" .value=${this.customer.phone} name="phone" placeholder="Phone" ></lion-input>
            </form>
        `;
        render(tmp, this);
    }
}

customElements.define('address-fields', AddressFields);
