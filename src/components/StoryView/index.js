import './storyView.css'
import { data } from '../Story/dataTest.js'

class StoryView extends HTMLElement {
  constructor() { 
    super();
    this.data = data;
    this.storyWrapper = document.createElement('div');
    this.storyWrapper.className = 'story-modal-wrapper';
    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';
    this.render();
  }

  render() {
    this.appendChild(this.storyWrapper);
    this.storyWrapper.appendChild(this.modalWrapper);

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    console.log(id);
    // Find the index of the data with the corresponding ID
    const index = this.data.findIndex(item => item.id === id);

    // If index is not -1, the ID was found in the data array
    if(index !== -1) {

      // If there is a previous element, create a side story for it
      if(index > 0) {
        const prevData = this.data[index - 1];
        this.createStoryContainer(prevData, 'side-story');
      }

      const middleData = this.data[index];
      
      this.createStoryContainer(middleData, 'story');

      // If there is a next element, create a side story for it
      if(index < this.data.length - 1) {
        const nextData = this.data[index + 1];
        this.createStoryContainer(nextData, 'side-story');
      }
    }

  }

  createStoryContainer(data, className) {
    const container = document.createElement('div');
    container.className = `story-container`;

    if(className === 'story') {
      container.style.flexGrow = 1;
    }

    this.modalWrapper.appendChild(container);

    if (className !== 'side-story') {
      const modalStory = document.createElement('div');
      modalStory.className = 'modal-story';

      container.appendChild(modalStory);
    } else {
      const sideStory = document.createElement('div');
      sideStory.className = 'side-story';

      container.appendChild(sideStory);
    }
  }
  
}

window.customElements.define('storyview-component', StoryView);
