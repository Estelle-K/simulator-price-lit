import { LitElement, html, css } from 'lit';
import './runtime-element.js';
export class FetchData extends LitElement {
  static get properties() {
    return {
      response: { type: Array },
    };
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
      <div class="container">
        <runtime-element .response="${response}"></runtime-element>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-rows: 1fr 6fr;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        'header header header'
        'columnRuntime columnPlan columnCart';
      grid-column-gap: 15px;
      padding: 0 15px;
      margin-bottom: 20px;
      height: 95vh;
    }
  `;
}

customElements.define('fetch-data', FetchData);
