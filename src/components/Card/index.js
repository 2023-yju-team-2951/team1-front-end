import './Card.css';
class Card extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="card">
        <h1>card title</h1>
        <p>card content</p>
      </div>
    `;
  }
}

window.customElements.define('card-component', Card);
