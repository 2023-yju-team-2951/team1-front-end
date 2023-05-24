import './Header.css';
import '../Story'

class Header extends HTMLElement {
  constructor() { 
    super();
    
    this.innerHTML = 
    `
    <div class="main">
      <div class="main-body">
        <div class="header">
          <div class="menu"> 

            <ul class="list">
              <Story-component>
              </Story-component>
            </ul>

          </div>
        </div>
      </div>
    </div>
    `
  }
}

window.customElements.define('header-component', Header);