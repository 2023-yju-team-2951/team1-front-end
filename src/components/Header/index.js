import './Header.css';
import '../Story'

class Header extends HTMLElement {
  constructor() { 
    super();
    
    this.innerHTML = 
    `
    <div class="main">
      <div class="main-body">
        <div class="story-wrapper">
          <story-component></story-component>
        </div>
      </div>
    </div>
    `
  }
}

window.customElements.define('header-component', Header);