import {html, render} from './node_modules/lit-html/lit-html.js';

class App extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const tmp = html`init`;
        render(tmp, this);
    }
}

customElements.define('ing-app', App)