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
    const storyContainer = document.createElement("div");
    storyContainer.className = "story-container";
  
    const centerStory = document.createElement("div");
    centerStory.className = "center-story";
  
    const leftStories = document.createElement("div");
    leftStories.className = "left-stories";
  
    const rightStories = document.createElement("div");
    rightStories.className = "right-stories";
  
    this.appendChild(storyContainer);
    storyContainer.appendChild(centerStory);
    storyContainer.appendChild(leftStories);
    storyContainer.appendChild(rightStories);
  
    let translateXValue = 0;
  
    this.data.forEach((story) => {
      const storyElement = document.createElement("section");
      storyElement.className = "modal-story";
  
      const storyItem = document.createElement("div");
      storyItem.className = "story-item";
  
      const btnElement = document.createElement("button");
      btnElement.className = "slide-button prevB";
  
      const btnElement2 = document.createElement("button");
      btnElement2.className = "slide-button nextB";
  
      const btnDiv = document.createElement("div");
      btnDiv.className = "btn-prev";
  
      const btnDiv2 = document.createElement("div");
      btnDiv2.className = "btn-next";
  
      const carouselElement = document.createElement("div");
      carouselElement.className = "carousel slide";
      carouselElement.id = "imgCarousel";
  
      const carouselInner = document.createElement("div");
      carouselInner.className = "carousel-inner";
  
      const carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item active";
  
      const imgElement = document.createElement("img");
      imgElement.src = story.img;
  
      storyContainer.appendChild(storyElement);
      storyElement.appendChild(storyItem);
      storyItem.appendChild(btnElement);
      storyItem.appendChild(btnElement2);
      btnElement.appendChild(btnDiv);
      btnElement2.appendChild(btnDiv2);
      storyItem.appendChild(carouselElement);
      carouselElement.appendChild(carouselInner);
      carouselInner.appendChild(carouselItem);
      carouselItem.appendChild(imgElement);
  
      // 스토리 요소를 중앙, 왼쪽, 오른쪽에 추가
      if (translateXValue === 0) {
        centerStory.appendChild(storyElement);
      } else if (translateXValue < 0) {
        leftStories.appendChild(storyElement);
      } else {
        rightStories.appendChild(storyElement);
      }
  
      translateXValue += 300;
    });
  }
  
}

window.customElements.define('storyview-component', StoryView);