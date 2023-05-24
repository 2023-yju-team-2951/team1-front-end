import './Story.css'

class Story extends HTMLElement {
  constructor() {
    super();

    this.innerHTML =
    ` 
    <div class="test"></div>

    <li class="item"> 

      <div class="item-div">

        <div class="photo">
          <canvas></canvas>
          <img src="./assets/image/imyon.jpg" alt="test">
        </div>

        <div class="name">
          <p>이름</p>
        </div>

      </div>

    </li>
    `
  }
}

window.customElements.define('story-component', Story);