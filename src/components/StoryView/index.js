import './storyview.css'

class StoryView extends HTMLElement {
  constructor() { 
    super();

    this.currentOffset = 0;
    
    this.innerHTML = 
    `
    <div class="story-modal">
      <div class="story-modal-body">
        <div class="story-modal-wrapper">
          <div class="story-modal-container">
                        
          </div>
        </div>
      </div>
    </div>
    `
  }
}

window.customElements.define('storyview-component', StoryView);