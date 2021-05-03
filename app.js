import {html, render} from './node_modules/lit-html/lit-html.js';
import './modules/steps/index.js';

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