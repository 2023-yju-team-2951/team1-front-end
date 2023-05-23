import './Header.css';

class Header extends HTMLElement {
  constructor() { 
    super();
    
    this.innerHTML = 
    `
    <div class="header">

      <div class="header-layout">

        <div class="search">
          <span class="material-symbols-outlined"> search </span>
        </div>

        <div class="logo">
          <a href="/" class="nav__link" data-link>
            <img src="./assets/image/Logo.png" alt="logo">
          </a>
        </div>

        <div class="icon">
          <span class="material-symbols-outlined"> favorite </span>
          <span class="material-symbols-outlined"> shopping_cart_checkout </span>
          <span class="material-symbols-outlined"> account_circle </span>
        </div>

      </div>

      <div class="category">
        <ul class="category-list">
          <li>
          <a href="/men" class="nav__link" data-link>Men</a>
          </li>
          <li>
          <a href="/women" class="nav__link" data-link>Women</a>
          </li>
          <li>
            <a href="/about" class="nav__link" data-link>About us</a>
          </li>
        </ul>
      </div>

    </div>
    `
  }
}

window.customElements.define('header-component', Header);