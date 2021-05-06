import { html, render } from '@lion/core';
import '@lion/input/define';
import  '@lion/input/lion-input';  
import './components/addressFields';
import { getCustomerDetails } from './actions';

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
        getCustomerDetails().then((res) => {
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
            // update the delivery address in global state
            if(!this.hasVoucher) {
                this.addressFields.map(field => deliveryAddress[field] = document.getElementById(field).value);
            }
            this.handleDeliveryAddress(deliveryAddress);
        }

        const _render = () => {
            const tmp = html`
            <div class="delivery-wrapper">
                <h2>Delivery information</h2>
                <address-fields .customer=${this.customer} .hasVoucher=${this.hasVoucher}></address-fields>
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
