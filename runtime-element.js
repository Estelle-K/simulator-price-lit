import { LitElement, html, css } from 'lit';
import { stylesComponents } from './styles-components.js';
import imgAdd from './assets/outline_add_white_24dp.png';

export class RuntimeElement extends LitElement {
  /* static properties = {
    response: { type: Array },
  }; */

  static get properties() {
    return {
      response: { type: Array },
      listElements: { type: Array },
      listElementParent: { type: Function }
    };
  }

  constructor() {
    super();
    this.listElements = [];
  }

  getListElements(name, logo, id, flavors) {
    this.listElements = [{ name: name, logo: logo, id: id, flavors: flavors }];
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
                              alt="${item.name}'s logo"
                              class="sizeImage"
                              src=${item.logo}
                            />
                            <span class="spaceElementVariant">
                              ${item.name}
                            </span>
                            <span class="alignRight">
                              <button
                                type="button"
                                @click=${() => {
                                  this.getListElements(
                                    item.name,
                                    item.logo,
                                    item.id,
                                    item.flavors
                                  );
                                  this.listElementParent(this.listElements);
                                }}
                              >
                                <img
                                  class="imgAdd"
                                  aria-label="${item.name}'s plan"
                                  alt="${item.name}'s plan"
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
    stylesComponents
  ];
}

customElements.define('runtime-element', RuntimeElement);
