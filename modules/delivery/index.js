import { html, render } from '@lion/core';

class Delivery extends HTMLElement {
    constructor() {
        super();
        this.customer = {
            fullname: '',
            email: '',
            phone: '',
            address: {
                street: '',
                houseNumber: '',
                houseNumberAddition: '',
                postalCode: '',
                city: ''
            }
        }
        this.hasVoucher = false;
    }
    connectedCallback() {

        // check if all the items in the basket are voucher
        this.hasVoucher = this.basketItems.every((item) => item.fulfillmentType === 'VOUCHER');

        // prefill customer address only when it's available
        fetch(`/assets/mocks/customer.json`).then(res => res.json()).then((res) => {
            this.customer.address = res?.addresses[0];
            this.customer.fullname = res?.correspondenceName;
            this.customer.email = res?.personalEmailAddress;
            this.customer.phone = res?.phoneNumber;
            _render();
        }).catch(() => {
            _render();
        });

        const confirmDeliveryAddress = () => {
            let deliveryAddress = [];
            if(!this.hasVoucher) {
                const addressFields = ['street', 'houseNumber', 'houseNumberAddition', 'postalCode', 'city'];
                addressFields.map(field => deliveryAddress[field] = document.getElementById(field).value)
            }
            this.handleDeliveryAddress(deliveryAddress);
        }

        const _render = () => {
            const tmp = html`<div class="delivery-wrapper">
            <h2>Delivery information</h2>
            <form name="addressFields">
                <input type="text" .value=${this.customer.fullname} name="fullname" placeholder="Full name"></input>
                <input type="email" .value=${this.customer.email} name="email" placeholder="Email" ></input>
                ${!this.hasVoucher ? html`
                <input type="text" .value=${this.customer.address.street} id="street" name="street" placeholder="Street" ></input>
                <input type="text" .value=${this.customer.address.houseNumber} id="houseNumber" name="houseNumber" placeholder="House number" ></input>
                <input type="text" .value=${this.customer.address.houseNumberAddition} id="houseNumberAddition" name="houseNumberAddition" placeholder="Additional House Number" ></input>
                <input type="text" .value=${this.customer.address.postalCode} id="postalCode" name="postalCode" placeholder="Postal Code" ></input>
                <input type="text" .value=${this.customer.address.city} id="city" name="city" placeholder="City" ></input>` : ``}
                <input type="text" .value=${this.customer.phone} name="phone" placeholder="Phone" ></input>
            </form>
            <footer>
                <button @click=${() => this.handleStepChange(1)}>previous step</button>
                <button class="btn-primary" @click=${() => confirmDeliveryAddress()}>Next step</button>
            </footer>`;
            render(tmp, this);
        }
    }
}

customElements.define('delivery-step', Delivery);
