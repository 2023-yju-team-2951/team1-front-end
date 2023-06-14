import { getProfileById, updateProfile, postProfile, getProfiles  } from '../../api/profiles.js';
import { getAccountById } from '../../api/accounts.js';
import StoryModal from '../StoryModal/';
import './story.css'
import { exchangeModal } from '../utils/exchangeModal.js';

class Story extends HTMLElement {
  constructor() {
    super();

    this.loadDatas();
  }

  async loadDatas() {
    try {
      this.data = await getProfiles();
      this.render();
      const canvasElements = this.querySelectorAll('canvas');
      canvasElements.forEach((canvasElement) => {
        this.draw(canvasElement);
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let translateXValue = -15;
    let storyHTML = `<ul class="container">`;

    this.data.forEach((story) => {
      storyHTML += `
        <li class="slider" style="transform: translateX(${translateXValue}px);">
          <div class="story-container">
            <button class="story">
              <div class="profile" aria-disabled="true">
                <canvas width="66" height="66"></canvas>
                <div class="image">
                  <img src="${story.img}">
                </div>
                <a data-link href="/story?id=${story.id}"></a>
              </div>
              <div class="name">${story.name}</div>
            </button>
          </div>
        </li>
      `;
      translateXValue += 80;
    });


    storyHTML += `
      <li class="slider" style="transform: translateX(${translateXValue}px);">
        <div class="story-container">
          <div class="story" id="add-story" data-bs-toggle="modal" data-bs-target="#swapModal">
            <div class="profile">
              <span class="material-symbols-outlined">add</span>
            </div>
          </div>
        </div>
      </li>
    `;

    storyHTML += `</ul>`;
    this.innerHTML = storyHTML;

    document.addEventListener('finishButtonClicked', (event) => {
      this.addStory(event.detail);
    }, false);

    this.querySelector('#add-story').addEventListener('click', () => {
      exchangeModal(new StoryModal('main'));
    });

    const canvasElements = this.querySelectorAll('canvas');
    canvasElements.forEach((canvasElement) => {
      this.draw(canvasElement);
    });
  }

  draw(canvasElement) {
    var canvas = canvasElement;
    var ctx = canvas.getContext('2d');

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0.2, '#fdf497');
    gradient.addColorStop(0.5, '#d6249f');
    gradient.addColorStop(1, '#285AEB');

    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 31, 0, 360, false);
    ctx.stroke();
  }

  addStory(detail) {

    const testId = 2;
    const background = detail.background;
    const text = detail.text;
    const color = detail.textColor;

    this.addStoryView(testId, background, text, color);
  }

  async addStoryView(testId, background, text, textColor) {
    try {
      let data = await getProfileById(testId);

      data.storyImg.push(background);
      data.storyText.push({ text, color: textColor });

      await updateProfile(testId, data.storyImg, data.storyText);
    } catch (error) {
      if (error.status === 404) {
        const data = await getAccountById(testId);
        const appendData = {
          ...data,
          storyImg: [...(data.storyImg || []), background],
          storyText: [...(data.storyText || []), { text, color: textColor }],
        };
        await postProfile(appendData);
      } else {
        console.error(error);
      }
    }
    
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.loadDatas();

  }

}

class AnotherComponent {
  constructor(button, modal) {
    // 이 버튼이 클릭되면 모달을 띄우게 합니다.
    button.addEventListener('click', () => modal.show());
  }
}

window.customElements.define('story-component', Story);