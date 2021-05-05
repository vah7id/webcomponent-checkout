import { html, render } from '@lion/core';

class StepsTab extends HTMLElement {
    constructor() {
        super();
        this.selectedStep = 1;
    }
    set step(newValue) {
        this.setAttribute('step', newValue);
    }
    static get observedAttributes() {
        return ['step'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue !== newValue && name === 'step') {
            this.setAttribute('step', parseInt(newValue));
            this.selectedStep = parseInt(newValue);
            this._render();
        }
    }

    _render() {
        const tmp = html`
            <lion-step class="step-item" initial-step>
                <label class=${this.selectedStep === 1 ? 'step-active' : ''}>1 Basket</label>
            </lion-step>
            <lion-step class="step-item">
                <label class=${this.selectedStep === 2 ? 'step-active' : ''}>2 Delivery</label>
            </lion-step>
            <lion-step class="step-item">
                <label class=${this.selectedStep === 3 ? 'step-active' : ''}>3 Payment</label>
            </lion-step>
            <lion-step class="step-item">
                <label class=${this.selectedStep === 4 ? 'step-active' : ''}>4 Confirmation</label>
            </lion-step>
           `;
        render(tmp, this);
    }
  
    connectedCallback() {
        this._render();
    }
}

customElements.define('steps-tab', StepsTab);
