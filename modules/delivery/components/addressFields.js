import { html, render } from '@lion/core';

class AddressFields extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`
            <form name="addressFields">
                <lion-input type="text" .value=${this.customer.fullname} name="fullname" label="Full name"></lion-input>
                <lion-input type="email" .value=${this.customer.email} name="email" label="Email" ></lion-input>
                ${!this.hasVoucher ? html`
                <lion-input type="text" .value=${this.customer.address.street} id="street" name="street" label="Street" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumber} id="houseNumber" name="houseNumber" label="House number" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumberAddition} id="houseNumberAddition" name="houseNumberAddition" label="Additional House Number" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.postalCode} id="postalCode" name="postalCode" label="Postal Code" ></lion-input>
                <lion-input type="text" .value=${this.customer.address.city} id="city" name="city" label="City" ></lion-input>` : ``}
                <lion-input type="text" .value=${this.customer.phone} name="phone" label="Phone" ></lion-input>
            </form>
        `;
        render(tmp, this);
    }
}

customElements.define('address-fields', AddressFields);
