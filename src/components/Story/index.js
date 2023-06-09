import { getProfiles } from '../../api/profiles.js';
import StoryModal from '../StoryModal/';
import './story.css'

class Story extends HTMLElement {
  constructor() {
    super();
    
    this.storyModal = new StoryModal();
    this.appendChild(this.storyModal);

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
          <div class="story" id="add-story" data-bs-toggle="modal" data-bs-target="#storyModal">
            <div class="profile">
              <span class="material-symbols-outlined">add</span>
            </div>
          </div>
        </div>
      </li>
    `;

    storyHTML += `</ul>`;
    this.innerHTML = storyHTML;

    this.querySelector('#add-story').addEventListener('click', () => {
      this.storyModal.remove();
      this.storyModal = new StoryModal();
      this.appendChild(this.storyModal);
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

}

window.customElements.define('story-component', Story);
