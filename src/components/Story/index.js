import { data } from "./dataTest.js"
import "./story.css";

class Story extends HTMLElement {
  constructor() {
    super();

    this.data = data;

    this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "container";

    const slider = document.createElement("div");
    slider.className = "slider";

    this.data.forEach((story) => {
      const storyContainer = document.createElement("div");
      storyContainer.className = "story-container";
      
      const storyElement = document.createElement("button");
      storyElement.className = "story";

      const profileElement = document.createElement("div");
      profileElement.className = "profile";
      profileElement.setAttribute("aria-disabled", "true");

      const canvasElement = document.createElement("canvas");
      canvasElement.width = 66;
      canvasElement.height = 66;

      const imgElement = document.createElement("div");
      imgElement.className = "image";

      const img = document.createElement("img");
      img.src = story.img;

      const name = document.createElement("div");
      name.className = "name";

      const nameText = document.createTextNode(story.name);

      this.appendChild(container);
      container.appendChild(slider);

      slider.appendChild(storyContainer);
      storyContainer.appendChild(storyElement);
      storyElement.appendChild(profileElement);
      storyElement.appendChild(name);

      profileElement.appendChild(canvasElement);
      profileElement.appendChild(imgElement);
      imgElement.appendChild(img);
      name.appendChild(nameText);

    });

    // prevButton.addEventListener("click", this.slidePrev.bind(this));
    // nextButton.addEventListener("click", this.slideNext.bind(this));
  }

  // slidePrev() {
  //   const slider = this.querySelector(".slider");
  //   const sliderWidth = slider.offsetWidth;
  //   const containerWidth = slider.parentElement.offsetWidth;
  //   const maxOffset = 0;

  //   if (this.currentOffset < maxOffset) {
  //     this.currentOffset += containerWidth;
  //     slider.style.transform = `translateX(${this.currentOffset}px)`;
  //   }
  // }

  // slideNext() {
  //   const slider = this.querySelector(".slider");
  //   const sliderWidth = slider.offsetWidth;
  //   const containerWidth = slider.parentElement.offsetWidth;
  //   const minOffset = -(sliderWidth - containerWidth);

  //   if (this.currentOffset > minOffset) {
  //     this.currentOffset -= containerWidth;
  //     slider.style.transform = `translateX(${this.currentOffset}px)`;
  //   }
  // }

  // 엘리먼트가 호출된 후 실행하는 함수
  connectedCallback() {
    const canvasElements = this.querySelectorAll("canvas");
    canvasElements.forEach((canvasElement) => {
      this.draw(canvasElement); // draw 메서드 호출
    });
  }

  draw(canvasElement) {

    var canvas = canvasElement;
    var ctx = canvas.getContext("2d");

    // 중심 잡기
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0.2, "#fdf497");
    gradient.addColorStop(0.5, "#d6249f");
    gradient.addColorStop(1, "#285AEB");

    // 테두리 그리기
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 31, 0, 360, false); // 원 그리기
    ctx.stroke();
  }
  
}

window.customElements.define("story-component", Story);