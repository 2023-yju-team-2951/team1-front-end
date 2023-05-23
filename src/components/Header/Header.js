import css from '../../css.js'

class Header extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    ${css.Header}
    <h1>Header</h1>
    `
  }
}

window.customElements.define('header-component', Header);