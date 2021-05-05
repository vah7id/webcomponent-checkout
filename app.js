import { html, render } from '@lion/core';
import './modules/steps';  

class App extends HTMLElement {
    constructor() {
        super();
        this.step = 1;
    }
    connectedCallback() {
        const tmp = html`<steps-bar .step=${this.step}></steps-bar>`
        render(tmp, this);
    }
}

customElements.define('ing-app', App)