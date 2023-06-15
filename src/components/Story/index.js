import {
  getProfileById,
  updateProfile,
  postProfile,
  getProfiles,
} from '../../api/profiles.js';
import { getAccountById } from '../../api/accounts.js';
import { exchangeModal } from '../utils/exchangeModal.js';
import { uploadImg } from '../../api/thumbsnap.js';
import StoryModal from '../Modal/StoryModal/';
import './story.css';

class Story extends HTMLElement {
  constructor(account) {
    super();
    this.account = account;

    this.handleFinishButtonClicked = this.handleFinishButtonClicked.bind(this);
  }

  connectedCallback() {
    document.addEventListener(
      'finishButtonClicked',
      this.handleFinishButtonClicked
    );
    this.loadDatas();
  }

  disconnectedCallback() {
    document.removeEventListener(
      'finishButtonClicked',
      this.handleFinishButtonClicked
    );
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

  handleFinishButtonClicked(event) {
    this.addStory(event.detail);
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

    // 스토리 추가버튼 누르면 모달창 띄우기
    this.querySelector('#add-story').addEventListener('click', () => {
      exchangeModal(new StoryModal('main'));
    });

    // 캔버스 그리기
    const canvasElements = this.querySelectorAll('canvas');
    canvasElements.forEach((canvasElement) => {
      this.draw(canvasElement);
    });
  }

  // 스토리에 테두리 원 그리는 함수
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

  // 스토리 추가할때 기본값 넘겨주기
  async addStory(detail) {
    const testId = this.account.id;
    const text = detail.text;
    const color = detail.textColor;
    let background = '';

    if (detail.background.type) {
      console.log('이미지');
      background = await uploadImg(detail.background);
    } else {
      console.log('색상');
      background = detail.background;
    }

    this.addStoryView(testId, background, text, color);
  }

  // 스토리 추가
  async addStoryView(testId, background, text, textColor) {
    try {
      let data = await getProfileById(testId);

      data.storyImg.push(background);
      data.storyText.push({ text, color: textColor });

      await updateProfile(testId, data.storyImg, data.storyText);
    } catch (error) {
      if (error.status === 404) {
        const storyImg = [background];
        const storyText = [{ text, color: textColor }];
        const data = await getAccountById(testId);
        await postProfile(data.id, data.name, data.img, storyImg, storyText);
      } else {
        console.error(error);
      }
    }

    this.innerHTML = '';

    this.loadDatas();
  }
}

window.customElements.define('story-component', Story);

export default Story;
