import './storyview.css'

class StoryView extends HTMLElement {
  constructor() { 
    super();

    this.data = [
      {
        img: "./assets/image/imyon.jpg",
        name: "imyon"
      },
      {
        img: "./assets/image/vaundy.jpg",
        name: "vaundy"
      },
    ]

    this.render()
  }

  render() {
    
  }
  
}

window.customElements.define('storyview-component', StoryView);