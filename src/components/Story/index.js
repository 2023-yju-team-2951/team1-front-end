import { getStories } from '../../api/stories';
import './story.css';

class Story extends HTMLElement {
  constructor() {
    super();

    this.data = [];

    this.render();
  }

  // 렌더링
  async render() {
    this.data = await getStories();

    const container = document.createElement('ul');
    container.className = 'container';

    this.appendChild(container);

    let translateXValue = 0;

    this.data.forEach((story) => {
      const slider = document.createElement('li');
      slider.className = 'slider';

      const storyContainer = document.createElement('div');
      storyContainer.className = 'story-container';

      const storyElement = document.createElement('button');
      storyElement.className = 'story';

      const linkElement = document.createElement('a');
      linkElement.href = '/story';
      linkElement.setAttribute('data-link', '');

      const profileElement = document.createElement('div');
      profileElement.className = 'profile';
      profileElement.setAttribute('aria-disabled', 'true');

      const canvasElement = document.createElement('canvas');
      canvasElement.width = 66;
      canvasElement.height = 66;

      const imgElement = document.createElement('div');
      imgElement.className = 'image';

      const img = document.createElement('img');
      img.src = story.img;

      const name = document.createElement('div');
      name.className = 'name';

      const nameText = document.createTextNode(story.name);

      const translateX = `translateX(${translateXValue}px)`;
      slider.style.transform = translateX;

      // li 요소가 만들어질때 마다 오른쪽으로 80px씩 이동
      translateXValue += 80;

      container.appendChild(slider);

      slider.appendChild(storyContainer);
      storyContainer.appendChild(storyElement);
      storyElement.appendChild(profileElement);
      storyElement.appendChild(name);

      profileElement.appendChild(canvasElement);
      profileElement.appendChild(imgElement);
      profileElement.appendChild(linkElement);
      imgElement.appendChild(img);
      name.appendChild(nameText);
    });
  }

  // 엘리먼트가 호출된 후 실행하는 함수
  connectedCallback() {
    const canvasElements = this.querySelectorAll('canvas');
    canvasElements.forEach((canvasElement) => {
      this.draw(canvasElement); // draw 메서드 호출
    });
  }

  // 테두리 원 그리는 함수
  draw(canvasElement) {
    var canvas = canvasElement;
    var ctx = canvas.getContext('2d');

    // 중심 잡기
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0.2, '#fdf497');
    gradient.addColorStop(0.5, '#d6249f');
    gradient.addColorStop(1, '#285AEB');

    // 테두리 그리기
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 31, 0, 360, false); // 원 그리기
    ctx.stroke();
  }
}

window.customElements.define('story-component', Story);
