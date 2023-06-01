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
    this.sizeChange();
    this.render();
  }

  render() {
    this.appendChild(this.storyWrapper);
    this.storyWrapper.appendChild(this.modalWrapper);

    // 주소에서 id 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    
    // 데이터에서 id 값이 같은 데이터의 인덱스번호 가져오기
    const index = this.data.findIndex(item => item.id === id);

    // 스토리 생성
    if(index !== -1) {

      // 첫번째 스토리가 아니면 왼쪽 스토리 생성
      if(index > 0) {
        const prevData = this.data[index - 1];
        this.createStoryContainer(prevData, 'side-story');
      }

      // 중앙 스토리
      const middleData = this.data[index];
      this.createStoryContainer(middleData, 'story');

      // 맨 마지막 스토리가 아니면 오른쪽 스토리 생성
      if(index < this.data.length - 1) {
        const nextData = this.data[index + 1];
        this.createStoryContainer(nextData, 'side-story');
      }
    }

  }

  createStoryContainer(data, className) {
    const container = document.createElement('div');
    container.className = `story-container`;

    container.style.width = window.innerWidth / 3 + 'px';

    this.modalWrapper.appendChild(container);

    if (className !== 'side-story') {
      const modalStory = document.createElement('div');
      modalStory.className = 'modal-story';

      const storyItem = document.createElement('div');
      storyItem.className = 'story-item';

      const slideBtnPrev = document.createElement('button');
      slideBtnPrev.className = 'slide-button prevB';

      const slideBtnNext = document.createElement('button');
      slideBtnNext.className = 'slide-button nextB';

      const prevBtn = document.createElement('div');
      prevBtn.className = 'btn-prev';

      const nextBtn = document.createElement('div');
      nextBtn.className = 'btn-next';

      const imgContainer = document.createElement('div');
      imgContainer.className = 'img-container';

      const imgSize = document.createElement('div');
      imgSize.className = 'img-size';

      const imgItem = document.createElement('div');
      imgItem.className = 'img-item';

      const imgDiv = document.createElement('div');
      imgDiv.className = 'img-div';

      const img = document.createElement('img');
      img.src = data.img;

      container.appendChild(modalStory);
      modalStory.appendChild(storyItem);
      storyItem.appendChild(slideBtnPrev);
      storyItem.appendChild(slideBtnNext);
      slideBtnPrev.appendChild(prevBtn);
      slideBtnNext.appendChild(nextBtn);
      storyItem.appendChild(imgContainer);
      imgContainer.appendChild(imgSize);
      imgSize.appendChild(imgItem);
      imgItem.appendChild(imgDiv);
      imgDiv.appendChild(img);
    } 
    else {
      const sideStory = document.createElement('div');
      sideStory.className = 'side-story';

      const sideStoryImg = document.createElement('div');
      sideStoryImg.className = 'side-image';

      const sideImg = document.createElement('img');
      sideImg.src = data.img;

      container.appendChild(sideStory);
      sideStory.appendChild(sideStoryImg);
      sideStoryImg.appendChild(sideImg);
    }
  }

  connectedCallback() {
    this.reSize();
  }
  
  sizeChange() {
    this.reSize();
  
    window.addEventListener('resize', () => {
      this.reSize();
    });
  }
  
  reSize() {
    
    let viewportWidth = window.innerWidth;
    let containerHeight = viewportWidth - 100;
  
    let storyContainers = this.storyWrapper.querySelectorAll('.story-container');
    let imgSizes = this.storyWrapper.querySelectorAll('.img-size');
    let img = this.storyWrapper.querySelectorAll('img');

    img.forEach(img => {
      img.sizes = img.offsetWidth + 'px';
    });

    if (containerHeight > 920) { 
      containerHeight = 840;
    } else if (containerHeight < 500) {
      containerHeight = 840;
    }
  
    storyContainers.forEach((storyContainer) => {
      storyContainer.style.width = containerHeight / 2 + 'px';
      storyContainer.style.height = containerHeight -40 + 'px';
  
      // sideStory 는 scale 0.4로 줄이기
      if(storyContainer.firstChild.className === 'side-story') {
        storyContainer.style.transform = `translate(0) scale(0.4)`;
      } else {
        storyContainer.style.transform = `translate(0)`;
      }
    });
  
    imgSizes.forEach(imgSize => {
      imgSize.style.width = containerHeight / 2 + 'px';
      imgSize.style.height = containerHeight -40 + 'px';
    });
  
    let containerElement = this.storyWrapper;
    containerElement.style.maxWidth = viewportWidth + 'px';
    containerElement.style.maxHeight = containerHeight + 'px';
  }
  
}

window.customElements.define('storyview-component', StoryView);
