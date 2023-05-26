import './Header.css';
import '../Story';

class Header extends HTMLElement {
  constructor() { 
    super();
    
    this.innerHTML = 
    `
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <div class="main">
      <div class="main-body">
        <div class="menu-wrapper">
          <div class="story-wrapper">
            <story-component></story-component>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

window.customElements.define('header-component', Header);