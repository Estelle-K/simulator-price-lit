import { LitElement, html, css } from 'lit';
import './runtime-element.js';
import './plan-element.js';
import { stylesComponents } from './styles-components.js';
export class FetchData extends LitElement {
  static get properties() {
    return {
      response: { type: Array },
      listParent: { type: Array },
      listCart: { type: Array },
      total: { type: Number },
    };
  }

  constructor() {
    super();
    this.response = [];
    this.listParent = [];
    this.listCart = [];
    this.total = 0;
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

  listElementCart(cart) {
    this.listCart = cart;
  }

  getTotal() {
    let addprice = 0;
    for (const price of this.listCart) {
      addprice += price.flavorPrice;
    }
    this.total = addprice.toFixed(2);
    console.log('total', this.total);
  }

  updated(total) {
    this.getTotal();
  }

  render() {
    const { response } = this;
    console.log('listCart', this.listCart);
    return html`
      <div class="container">
        <div class="header">
          <header>
            <h1>Cost <span>€${this.total}</span></h1>
          </header>
        </div>
        <runtime-element
          .response="${response}"
          .listElementParent="${this.listElementParent.bind(this)}"
        ></runtime-element>
        <plan-element
          .flavors="${this.listParent}"
          .listElementCart="${this.listElementCart.bind(this)}"
        ></plan-element>
      </div>
    `;
  }

  static styles = [
    stylesComponents,
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
