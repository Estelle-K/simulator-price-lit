import { LitElement, html, css } from 'lit';
import './runtime-element.js';
import './plan-element.js';
export class FetchData extends LitElement {
  static get properties() {
    return {
      response: { type: Array },
      listParent: { type: Array },
    };
  }

  constructor() {
    super();
    this.response = [];
    this.listParent = [];
  }

  async firstUpdated() {
    try {
      const result = await fetch(
        'https://api.clever-cloud.com/v2/products/instances'
      );

      const json = await result.json();

      this.response = this.getVariants(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  getVariants(instances) {
    let variants = [];
    for (const instance of instances) {
      let flavors = [];
      for (const flavor of instance.flavors) {
        flavors.push({
          flavor_name: flavor.name,
          cpus: flavor.cpus,
          gpus: flavor.gpus,
          ram: flavor.mem,
          price: flavor.price * 41.904,
        });
      }
      variants.push({
        name: instance.variant.name,
        logo: instance.variant.logo,
        id: instance.variant.id,
        flavors: flavors,
      });
    }
    return variants;
  }

  listElementParent(list) {
    this.listParent = list;
  }

  render() {
    const { response } = this;

    return html`
      <div class="container">
        <runtime-element
          .response="${response}"
          .listElementParent="${this.listElementParent.bind(this)}"
        ></runtime-element>
        <plan-element .flavors="${this.listParent}"></plan-element>
      </div>
    `;
  }

  static styles = [
    css`
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
    `,
  ];
}

customElements.define('fetch-data', FetchData);
