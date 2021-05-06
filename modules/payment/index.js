import { html, render } from '@lion/core';
import './components/paymentOption';
import { fetchPaymentOptions, validatePayment, reserveBasket } from './actions';

class Payment extends HTMLElement {
    constructor() {
        super();
        this.orderId = null;
        this.paymentId = null;
        this.totalAmount = null;
        this.paymentOptions = [];
    }
    async validatePayment(orderId, paymentId) {
        return validatePayment(orderId, paymentId).then(res => {
            // verify when the status of validation is healthy!!!
            if(res.status === 'PAYMENT_CONFIRMED') {
                this.handleStepChange(4);
            } else {
                alert('BAMMM!!! Your balance is not enough to proceed the payment!!!');
            }

        }).catch(err => {
            alert('Something is wrong with the services! Please try again...');
        });
    }
    getTotalPriceWithDiscount(total, discount) {
        const deductAmount = (total * discount) / 100;
        return total - deductAmount;
    }
    connectedCallback() {
        //1. reserve the basket first and get the order id
        //2. fetch payment options and render
        //3. send payment information to server to validate
        //4. If it was valid go to confirmation step otherwise show error
        
        reserveBasket(this.basketItems).then((res) => {
                this.orderId = res?.orderId;
                this.totalAmount = res?.total_amount;

                // apply 10% discount when the basket length is more than 3 Hooray!!!
                if(this.basketItems.length >= 3) {
                    this.totalAmount = this.getTotalPriceWithDiscount(this.totalAmount, 10);
                }
                
                fetchPaymentOptions().then(res => {
                    this.paymentOptions = res?.options;
                    _render();
                }).catch(err => {
                    alert('cannot fetch any payment options!! Try again...')
                    _render();
                });
        });

       const selectPaymentOption = (e, payment) => {
            // deselect the other payment options first
            document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('payment-active'));

            e.currentTarget.classList.add('payment-active');
            this.paymentId = payment.id;
            _render();
        }

        const _render = () => {
            const tmp = html`
            <div class="payment-wrapper">
                <h2>Payment</h2>
                <h3>Total amount to pay: ${this.totalAmount}</h3>
                <p>Select one of the payment options before proceed your order:</p>
                
                ${this.paymentOptions.map(paymentOption => 
                    html`<payment-option 
                            .onSelect=${selectPaymentOption} 
                            .option=${paymentOption}>
                            .selected=${this.paymentId === paymentOption.id}
                        </payment-option>`
                )}
                
                <footer>
                    <button class=${this.paymentId ? `btn-primary` : `btn-disabled`} @click=${() => this.validatePayment(this.orderId, this.paymentId)}>Confirm Payment</button>
                </footer>
            </div>`;
            render(tmp, this);
        }
        
    }
}

customElements.define('payment-step', Payment);
