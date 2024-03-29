import { LitElement, html, css } from 'lit';
import './runtime-element.js';
import './plan-element.js';
import './shoppingcart-element.js';
import { stylesComponents } from './styles-components.js';

/**
 * @typedef FetchData
 * @property {array} response Array contains all data from api
 * @property {array} listParent Array contains runtime selectionned
 * @property {array} listCart Array where add elements selectionned
 * @property {number} total sum total elements selectionned
 */
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

  /**
   * Fetch data through API
   * @async
   */
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

  /**
   * Retourn array with all element needed to application
   * @param {array} instances Data from API
   * @returns {array} Array with all element organised
   */
  getVariants(instances) {
      let variants = instances.map(instance => {
        let flavors = instance.flavors.map(flavor => {
          return {
            flavor_name: flavor.name,
            cpus: flavor.cpus,
            gpus: flavor.gpus,
            ram: flavor.mem,
            price: flavor.price * 41.904,
          };
        });
        return {
          name: instance.variant.name,
          logo: instance.variant.logo,
          id: instance.variant.id,
          flavors: flavors,
        };
      });
      
    return variants;
  }

  /**
   * Function send to runtimeElement component
   * @param {array} list array updated who contains runtime selectionned
   */
  listElementParent(list) {
    this.listParent = list;
  }

  /**
   * Function send to planElement and shoppingCart component
   * @param {array} list array updated who contains shopping cart selectionned
   */
  listElementCart(cart) {
    this.listCart = cart;
  }

  /**
   * Function send to shoppingCart component
   * @param {number} totalCart number updated who contains total amount
   */
  updateCart(totalCart) {
    this.total = totalCart;
  }

  /**
   * Calcul total of listCart selectionned by user
   * and adjust display number with two digits after decimal
   */
  getTotal() {
    let addprice = 0;
    for (const price of this.listCart) {
      addprice += price.flavorPrice;
    }
    this.total = addprice.toFixed(2);
  }

  updated() {
    this.getTotal();
  }

  render() {
    const { response } = this;
    //console.log('fetch-data', this.listCart);

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
          .listCart="${this.listCart}"
          .flavors="${this.listParent}"
          .listElementCart="${this.listElementCart.bind(this)}"
        ></plan-element>
        <shoppingcart-element
          .listCart="${this.listCart}"
          .updateCart="${this.updateCart.bind(this)}"
          .listElementCart="${this.listElementCart.bind(this)}"
        ></shoppingcart-element>
      </div>
    `;
  }

  static styles = [
    stylesComponents,
    css`
      .container {
        display: grid;
        grid-template-rows: auto 1fr;
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
