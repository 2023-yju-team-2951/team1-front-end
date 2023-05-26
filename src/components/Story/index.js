import './Story.css'

class Story extends HTMLElement {
  constructor() {
    super();

    this.innerHTML =
    ` 
    <div class="story-container">
      <button class="story"> 
        <div class="profile">
          <img src="./assets/image/imyon.jpg" alt="test">
        </div>
        <div class="name"> 
          <span>imyon</span>
        </div>
      </button> 
    </div>
    `
  }
}

window.customElements.define('story-component', Story);