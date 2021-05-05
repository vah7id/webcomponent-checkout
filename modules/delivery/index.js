import { html, render } from '@lion/core';
import '@lion/input/define';
import  '@lion/input/lion-input';  

class Delivery extends HTMLElement {
    constructor() {
        super();
        // default values
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
        this.addressFields = Object.keys(this.customer.address);
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
                this.addressFields.map(field => deliveryAddress[field] = document.getElementById(field).value);
            }
            this.handleDeliveryAddress(deliveryAddress);
        }

        const _render = () => {
            const tmp = html`
            <div class="delivery-wrapper">
           
                <h2>Delivery information</h2>
                
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

                <footer>
                    <button @click=${() => this.handleStepChange(1)}>previous step</button>
                    <button class="btn-primary" @click=${() => confirmDeliveryAddress()}>Next step</button>
                </footer>

            </div>`;
            render(tmp, this);
        }
    }
}

customElements.define('delivery-step', Delivery);
