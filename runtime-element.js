import { LitElement, html, css } from 'lit';
import { stylesComponents } from './styles-components.js';
import imgAdd from './assets/outline_add_white_24dp.png';

export class RuntimeElement extends LitElement {
  static properties = {
    response: { type: Array },
  };

  static get properties() {
    return {
      listElements: { type: Array },
    };
  }

  constructor() {
    super();
    this.listElements = [];
  }

  getListElements(name, logo, id, flavors) {
    /* this.listElements.push({
      name: name,
      logo: logo,
      id: id,
      plan: flavors,
    }); */
    this.listElements = [
      ...this.listElements,
      { name: name, logo: logo, id: id, flavors: flavors },
    ];
    console.log('listElements', this.listElements);
  }

  render() {
    return html`
        <div class="columnRuntime">
            <div class="headerList alignElement sticky">Runtime</div>
                ${
                  !this.response.length
                    ? html`<h2>No Runtime Found</h2>`
                    : this.response.map(
                        item => html`
                          <div class="containElement">
                            <img
                              alt="${item.variant.name}'s logo"
                              class="sizeImage"
                              src=${item.variant.logo}
                            />
                            <span class="spaceElementVariant">
                              ${item.variant.name}
                            </span>
                            <span class="alignRight">
                              <button
                                type="button"
                                @click=${() =>
                                  this.getListElements(
                                    item.variant.name,
                                    item.variant.logo,
                                    item.variant.id,
                                    item.variant.flavors
                                  )}
                              >
                                <img
                                  class="imgAdd"
                                  aria-label="${item.variant.name}'s plan"
                                  alt="${item.variant.name}'s plan"
                                  src=${imgAdd}
                                />
                              </button>
                            </span>
                          </div>
                        `
                      )
                }
        
                </div>
        </div>
        `;
  }

  static styles = [
    stylesComponents,

    css`
      .spaceElementVariant {
        padding-right: 3px;
      }

      .alignElement {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .alignLeft {
        margin-left: 10px;
      }

      .fontNormal {
        font-weight: 300;
      }
    `,
  ];
}

customElements.define('runtime-element', RuntimeElement);
