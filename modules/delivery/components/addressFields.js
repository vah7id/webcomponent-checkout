import { html, render } from '@lion/core';
import { AddressValidator } from '../utils';

class AddressFields extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`
            <form name="addressFields">
                <lion-input type="text" .value=${this.customer.fullname} name="fullname" label="Full name" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
                <lion-input type="email" .value=${this.customer.email} name="email" label="Email" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
                ${!this.hasVoucher ? html`
                <lion-input type="text" .value=${this.customer.address.street} id="street" name="street" label="Street" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumber} id="houseNumber" name="houseNumber" label="House number" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
                <lion-input type="text" .value=${this.customer.address.houseNumberAddition} id="houseNumberAddition" name="houseNumberAddition" label="Additional House Number"></lion-input>
                <lion-input type="text" .value=${this.customer.address.postalCode} id="postalCode" name="postalCode" label="Postal Code" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
                <lion-input type="text" .value=${this.customer.address.city} id="city" name="city" label="City" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>` : ``}
                <lion-input type="text" .value=${this.customer.phone} name="phone" label="Phone" .validators="${[new AddressValidator()]}" @keyup=${() => this.updateAddress()}></lion-input>
            </form>
        `;
        render(tmp, this);
    }
}

customElements.define('address-fields', AddressFields);
