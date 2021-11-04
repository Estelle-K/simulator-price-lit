import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

export class FetchData extends LitElement {
    static get properties() {
        return {
            response: {type: Array},
        }
    }

    constructor() {
        super();
        this.response = [];
    }

    async firstUpdated() {
        try {
            const test = await fetch(
                'https://api.clever-cloud.com/v2/products/instances'
            );
    
            const json = await test.json();
            this.response = json;
            
        } catch (error) {
            console.error(error.message);
        }
    }

    render() {
        const { response } = this;

        return html`
        <ul>
            ${response.map((item) => html` <li>${item.variant.name}</li> `)}
        </ul>
        `;

    }

};

customElements.define('fetch-data', FetchData);