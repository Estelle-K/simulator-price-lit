import { LitElement, html, css } from 'lit';
import { stylesComponents } from './styles-components.js';
import imgAdd from './assets/outline_add_white_24dp.png';

/**
 * @typedef PlanElement
 * @property {array} flavors plan's Array
 * @property {array} listCart Array where add elements selectionned
 * @property {function} listElementCart function to send listCart to fetchData
 */
export class PlanElement extends LitElement {
  static get properties() {
    return {
      flavors: { type: Array },
      listCart: { type: Array },
      listElementCart: { type: Function },
    };
  }

  constructor() {
    super();
    this.flavors = [];
    this.listCart = [];
  }

  /**
   * Copy and add params in listCart Array
   * @param {string} variantName It's the name of Runtime selected
   * @param {string} variantLogo It's the logo of Runtime selected
   * @param {string} variantId It's the ID of Runtime selected + add a random number
   * @param {string} flavorName It's the name of the plan selected
   * @param {string} flavorPrice It's the price of the plan selected
   */
  getListCart(variantName, variantLogo, variantId, flavorName, flavorPrice) {
    this.listCart = [
      ...this.listCart,
      {
        variantName: variantName,
        variantLogo: variantLogo,
        variantId: variantId + this.randomNumber(1, 100),
        flavorName: flavorName,
        flavorPrice: flavorPrice,
      },
    ];
  }

  /**
   * Generate a random number between min and max value
   * @param {number} min Minimum value
   * @param {number} max Maximum value
   * @returns {number} number generate
   */
  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    const { flavors } = this;

    return html`
      <div class="columnPlan">
        ${flavors.length
          ? html`
              <div class="headerList sticky alignElement">
                <span class="alignLeft">Runtime</span>
                <img
                  alt="${flavors[0].logo}'s logo"
                  class="sizeImage alignLeft"
                  src=${flavors[0].logo}
                />
                <span class="spaceElementVariant fontNormal">
                  ${flavors[0].name}
                </span>
              </div>
            `
          : html` <div class="headerList sticky alignElement">Plan</div> `}
        ${!flavors.length
          ? html`<h3>No Plan Selected</h3>`
          : html`
              <div class="overflowElement">
                <table id="plan">
                  <thead>
                    <tr>
                      <th class="spaceElementFlavors" scope="col">Plan</th>
                      <th class="alignRightElement" scope="col">CPUs</th>
                      <th class="alignRightElement" scope="col">GPUs</th>
                      <th class="alignRightElement" scope="col">RAM</th>
                    </tr>
                  </thead>
                  ${flavors.map(flavors =>
                    flavors.flavors.map(
                      flavor => html`
                        <tbody>
                          <tr>
                            <td
                              data-label="Plan"
                              class="spaceElementFlavors colorElement"
                            >
                              ${flavor.flavor_name}
                            </td>
                            <td
                              data-label="CPUs"
                              class="boldElement alignRightElement"
                            >
                              ${flavor.cpus}
                            </td>
                            <td
                              data-label="GPUs"
                              class="boldElement alignRightElement"
                            >
                              ${flavor.gpus}
                            </td>
                            <td
                              data-label="RAM"
                              class="boldElement alignRightElement"
                            >
                              ${flavor.ram}
                            </td>
                            <td>
                              <div class="containElement">
                                <span class="alignRight">
                                  <button
                                    type="button"
                                    @click=${() => {
                                      this.getListCart(
                                        flavors.name,
                                        flavors.logo,
                                        flavors.id,
                                        flavor.flavor_name,
                                        flavor.price
                                      );
                                      this.listElementCart(this.listCart);
                                    }}
                                  >
                                    <img
                                      class="imgAdd"
                                      aria-label="${flavor.flavor_name}'s plan"
                                      alt="${flavor.flavor_name}'s plan"
                                      src=${imgAdd}
                                    />
                                  </button>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      `
                    )
                  )}
                </table>
              </div>
            `}
      </div>
    `;
  }

  static styles = [
    stylesComponents,

    css`
      #plan {
        border-collapse: collapse;
        width: 100%;
      }

      #plan tr:hover {
        background-color: #f6f6fb;
      }

      .alignRightElement {
        text-align: right;
      }

      .spaceElementFlavors {
        padding-left: 10px;
        text-align: left;
      }

      #plan th,
      td {
        font-size: var(--global-size);
      }

      .overflowElement {
        overflow-x: auto;
      }

      .fontNormal {
        font-weight: 300;
      }
    `,
  ];
}

customElements.define('plan-element', PlanElement);
