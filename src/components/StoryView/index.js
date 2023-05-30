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

    let translateXValue = 0;

    this.data.forEach((story) => {

      const storyContainer = document.createElement("div");
      storyContainer.className = "story-modal-container";

      const translateX = `translateX(${translateXValue}px)`
      storyContainer.style.transform = translateX;

      translateXValue += 300;

      const storyElement = document.createElement("section");
      storyElement.className = "story";

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

      this.appendChild(storyContainer);
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


    })
  }
}

window.customElements.define('storyview-component', StoryView);