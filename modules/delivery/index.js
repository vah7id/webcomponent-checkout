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

    updateAddress() {
        // handle side effects of address field changes
        this.validateForm();
    }

    validateForm() {
        let isValid = true;
        const formInputs = document.querySelectorAll('form[name="addressFields"] input');
        const submitBtnEl = document.querySelector('.btn-primary');

        formInputs.forEach(input => {
            if(input.getAttribute('aria-invalid') === "true" || 
            (input.getAttribute('aria-required') === "true" && input.value === '')) {
                isValid = false;
            }
        });
        
        // disabled the submit button when the form is not valid
        if(isValid) {
            submitBtnEl.removeAttribute('disabled');
        } else {
            submitBtnEl.setAttribute('disabled', 'true');
        }
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
            // by default disable the next step button
            document.querySelector('.btn-primary').setAttribute('disabled', 'true');
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
                <address-fields 
                    .updateAddress=${this.updateAddress.bind(this)} 
                    .customer=${this.customer} 
                    .hasVoucher=${this.hasVoucher}>
                </address-fields>
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
