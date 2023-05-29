import './Header.css';

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

              <li class="item">

                <div class="item-div">

                  <div class="photo">
                    <canvas></canvas>
                    <span class="img">
                      <img src="../../../public/assets/image/imyon.jpg" alt="test">
                    </span>
                  </div>

                  <div class="name">
                    <p>이름</p>
                  </div>

                </div>

              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>
    `
  }
}

window.customElements.define('Header-component', Header);