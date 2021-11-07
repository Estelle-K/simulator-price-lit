import { LitElement, html, css } from 'lit';
import { stylesComponents } from './styles-components.js';
import imgAdd from './assets/outline_add_white_24dp.png';

export class PlanElement extends LitElement {
  static get properties() {
    return {
      flavors: { type: Array },
    };
  }

  constructor() {
    super();
    this.flavors = [];
  }

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
                                  <button type="button">
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
    `,
  ];
}

customElements.define('plan-element', PlanElement);