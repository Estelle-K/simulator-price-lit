import { LitElement, html, css } from 'lit';
import { stylesComponents } from './styles-components.js';
import imgRemove from './assets/outline_remove_white_24dp.png';

/**
 * @typedef ShoppingCartElement
 * @property {array} listCart Array contains elements selectionned
 * @property {function} updateCart function to send new total to fetchData
 * @property {number} totalCart sum total elements selectionned
 * @property {array} newListCart Array contains elements removed
 * @property {function} listElementCart function to send listCart to fetchData
 */
export class ShoppingCartElement extends LitElement {
  static get properties() {
    return {
      listCart: { type: Array },
      updateCart: { type: Function },
      totalCart: { type: Number },
      newListCart: { type: Array },
      listElementCart: { type: Function },
    };
  }

  constructor() {
    super();
    this.totalCart = this.updateCart;
  }

  /**
   * Remove element from shopping cart
   * @param {string} variantId Id element to remove of array
   * @param {number} flavorPrice price to remove of total amount
   */
  removeElementCart(variantId, flavorPrice) {
    this.newListCart = this.listCart.filter(
      elem => elem.variantId !== variantId
    );
    if (!this.newListCart.length) {
      this.totalCart = 0;
      this.listCart = [];
    } else {
      this.totalCart = this.totalCart - flavorPrice;
      this.listCart = this.newListCart;
    }
  }

  render() {
    //console.log("shoppingcart", this.listCart)

    return html`
      <div class="columnCart">
        <div class="headerList sticky alignElement">Shopping Cart</div>
        ${!this.listCart.length
          ? html`<h3>Cart Empy</h3>`
          : this.listCart.map(
              (cart, index) => html`
                <div key=${index} class="containElementCart borderElement">
                  <img
                    alt="${cart.variantLogo}'s logo"
                    class="sizeImage"
                    src=${cart.variantLogo}
                  />
                  <div>
                    <span>${cart.variantName}</span>
                    <div>
                      Plan :
                      <span class="colorElement"> ${cart.flavorName}</span>
                      <div>
                        Price :
                        <span class="boldElement">€${cart.flavorPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <span class="alignRight">
                    <button
                      type="button"
                      @click=${() => {
                        this.removeElementCart(
                          cart.variantId,
                          cart.flavorPrice
                        );
                        this.updateCart(this.totalCart);
                        this.listElementCart(this.listCart);
                      }}
                    >
                      <img
                        class="imgRemove"
                        aria-label="${cart.variantName}'s plan"
                        alt="${cart.variantName}'s plan"
                        src="${imgRemove}"
                      />
                    </button>
                  </span>
                </div>
              `
            )}
      </div>
    `;
  }

  static styles = [stylesComponents];
}

customElements.define('shoppingcart-element', ShoppingCartElement);
