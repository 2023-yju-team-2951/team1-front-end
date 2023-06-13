import './storyView.css';
import { getProfiles } from '../../api/profiles.js';
import { gsap } from "gsap";

class StoryView extends HTMLElement {

  constructor() {   
    super();
    this.storyWrapper = document.createElement('div');
    this.storyWrapper.className = 'story-modal-wrapper';
    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';
    this.loadDatas();
  }

  // 데이터 불러오기
  async loadDatas() {
    try {
      this.data = await getProfiles();
      this.render();
    } catch (error) {
      console.log(error);
    } 
  }    

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
  
    const index = this.data.findIndex((data) => data.id === id);
  
    let prevData = '', nextData = '';
    if(index > 0) prevData = this.data[index - 1];
    if(index < this.data.length - 1) nextData = this.data[index + 1];
  
    this.modalWrapper.innerHTML = `
      ${index > 0 ? new SideStory(prevData).render('left') : ''}
      ${new CenterStory(this.data[index]).render()}
      ${index < this.data.length - 1 ? new SideStory(nextData).render('right') : ''}
    `;
  
    this.storyWrapper.appendChild(this.modalWrapper);
  
    this.appendChild(this.storyWrapper);
  
    const leftStory = this.querySelector('.story-container.left');
    const rightStory = this.querySelector('.story-container.right');
    
    if (leftStory) {
      leftStory.addEventListener('click', () => {
        this.moveStory('left');
      });
    }
  
    if (rightStory) {
      rightStory.addEventListener('click', () => {
        this.moveStory('right');
      });
    }
  
    this.sizeChange();
  }
  
  
  sizeChange() {
    this.reSize();
  
    window.addEventListener('resize', () => {
      this.reSize();
    });
  }
  
  // 사이즈 크기에 맞게 변경
  reSize() {
    let viewportWidth = window.innerWidth;
    let containerHeight = viewportWidth >= 940 ? 840 : viewportWidth - 100;

    let storyContainers = this.storyWrapper.querySelectorAll('.story-container');
    let imgSizes = this.storyWrapper.querySelectorAll('.img-size');

    imgSizes.forEach(imgSize => { 
      imgSize.style.width = containerHeight / 2 + 'px';
      imgSize.style.height = containerHeight -40 + 'px';
    });

    storyContainers.forEach((storyContainer) => {
      storyContainer.style.width = containerHeight / 2 + 'px';
      storyContainer.style.height = containerHeight -40 + 'px';
    });

    let containerElement = this.storyWrapper;
    containerElement.style.maxWidth = viewportWidth + 'px';
    containerElement.style.maxHeight = containerHeight + 'px';
  }

  // 스토리 클릭 했을 때 애니메이션
  moveStory(directions) { 
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const data = this.data.find((data) => {
      if (directions === 'left') {
        return data.id === id - 1;
      }
        return data.id === id + 1;
    });
    let direction = ''

    const currentId = parseInt(urlParams.get('id'));

    if (directions === 'left' ) {
      direction = 'left';
      if (data.id === 1 || currentId === this.data.length) {
        direction = 'endLeft';
      }
    } else if (directions === 'right' ) {
      direction = 'right';
      if (data.id === this.data.length || currentId === 1) {
        direction = 'endRight';
      }
    }

    const sideStoryLeft = this.modalWrapper.querySelector('.story-container.left');
    const originalStory = this.modalWrapper.querySelector('.story-container.center');
    const sideStoryRight = this.modalWrapper.querySelector('.story-container.right');

    const tl = gsap.timeline({
      onComplete: () => {
        while (this.modalWrapper.firstChild) {
          this.modalWrapper.firstChild.remove();
        }
        
        const newURL = window.location.origin + window.location.pathname + '?id=' + data.id;
        history.pushState(null, null, newURL);
    
        this.render();
        this.sizeChange();
      }
    });
    if (direction === 'right') {
      // 클릭한 스토리가 오른쪽에 있을 때
      tl.add(
        gsap.to(sideStoryRight, {
          duration: 1, 
          scale: 1.2,
          x: `-140%`,
        })
      );
  
      tl.add(
        gsap.to(originalStory, {
          duration: 1, 
          scale: 0.3,
          x: '-140%',
        }),
        '<'
      );

      tl.add(
        gsap.to(sideStoryLeft, {
          duration: 1,
          x: '-140%',
          opacity: 0,
        }),
        '<'
      )
    } else if (direction === 'endLeft') {
      tl.add(
        gsap.to(sideStoryLeft, {
          duration: 1, 
          scale: 1.2,
          x: '70%',
        })
      );
  
      tl.add(
        gsap.to(originalStory, {
          duration: 1, 
          scale: 0.3,
          x: '70%',
        }),
        '<'
      );

      tl.add(
        gsap.to(sideStoryRight, {
          duration: 1,
          x: '70%',
          opacity: 0,
        }),
        '<'
      )
    } else if (direction === 'endRight') {
      tl.add(
        gsap.to(sideStoryRight, {
          duration: 1, 
          scale: 1.2,
          x: '-70%',
        })
      );
  
      tl.add(
        gsap.to(originalStory, {
          duration: 1, 
          scale: 0.3,
          x: '-70%',
        }),
        '<'
      );

      tl.add(
        gsap.to(sideStoryLeft, {
          duration: 1,
          x: '-70%',
          opacity: 0,
        }),
        '<'
      )
    }
    
    else {
      // 클릭한 스토리가 왼쪽에 있을 때
      tl.add(
        gsap.to(sideStoryLeft, {
          duration: 1, 
          scale: 1.2,
          x: '140%',
        })
      );
  
      tl.add(
        gsap.to(originalStory, {
          duration: 1,
          scale: 0.3, 
          x: '140%',
        }),
        '<' // 이전 애니메이션과 동시에 실행
      );

      tl.add(
        gsap.to(sideStoryRight, {
          duration: 1,
          x: '140%',
          opacity: 0,
        }),
        '<'
      )
    }
  }
}

// 중간 스토리 생성
class CenterStory {
  constructor(data) {
    this.data = data;
  }
  render() {
    let container = document.createElement('div');
    container.innerHTML = `
      <div class="story-container center">
        <div class="modal-story">
          <div class="story-item">
            <div class="story-header">
              <div class="story-title">
                <div class="story-name">${this.data.name}</div>
                <img class="story-small-img" src="${this.data.img}" />
              </div>
            </div>
            <button class="slide-button prevB" type="button" data-bs-target="#carouselAuto" data-bs-slide="prev">
              <div class="btn-prev"></div>
            </button>
            <button class="slide-button nextB" type="button" data-bs-target="#carouselAuto" data-bs-slide="next">
              <div class="btn-next"></div>
            </button>
            <div class="img-container">
              <div class="img-size">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let imgSize = container.querySelector(".img-size");

    const carouselImg = new CarouselImg(this.data);
    imgSize.appendChild(carouselImg.render());

    return container.innerHTML;
  }
}


// 캐러셀 이미지 생성
class CarouselImg {
  constructor(data) {
    this.data = data;
  }
  render() {
    const carouselSlide = document.createElement('div');
    carouselSlide.className = 'carousel slide';
    carouselSlide.id = 'carouselAuto';
    carouselSlide.setAttribute('data-bs-ride', 'carousel');

    const carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';


    if (Array.isArray(this.data.storyImg) && Array.isArray(this.data.storyText)) {

      for (let i = 0; i < this.data.storyImg.length; i++) {
        const carouselItem = document.createElement('div');
        const carouselIndicator = document.createElement('button');

        carouselIndicator.type = 'button';
        carouselIndicator.setAttribute('data-bs-target', '#carouselAuto');
        carouselIndicator.setAttribute('data-bs-slide-to', i);
        carouselIndicator.setAttribute('aria-label', `Slide ${i + 1}`);
  
        carouselItem.setAttribute('data-bs-interval', '10000');
        if (i === 0) {
          carouselItem.className = 'carousel-item active';
          carouselIndicator.className = 'active';
          carouselIndicator.setAttribute('aria-current', 'true');
        } else {
          carouselItem.className = 'carousel-item';
        }
  
        const img = document.createElement('div');
        img.className = 'img';
        if (/^http.*/.test(this.data.storyImg[i])) {
          img.style.background = `url(${this.data.storyImg[i]})`;
        } else {
          img.style.background = this.data.storyImg[i];
        }

        const textItem = this.data.storyText[i];

        const text = document.createElement('div');
        text.className = 'text';

        if (textItem.hasOwnProperty('text')) {
          const textElement = document.createElement('span');
          textElement.innerHTML = textItem.text;
          text.appendChild(textElement);
        }
  
        if (textItem.hasOwnProperty('color')) {
          text.style.color = textItem.color;
        }
        
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(carouselIndicator);
        carouselItem.appendChild(text);
      }
    }

    carouselSlide.appendChild(carouselIndicators);
    carouselSlide.appendChild(carouselInner);

    return carouselSlide;
  }
}

// 사이드 스토리 생성
class SideStory {
  constructor(data) {
    this.data = data;
  }
  render(name) {
    const container = document.createElement('div');
    
    container.innerHTML = `
      <div class="story-container ${name}" style="transform: scale(0.5)">
        <div class="side-story">
          <div class="img-container">
            <div class="img-size">
              <div class="img-item">
                <div class="img-div">
                  <div class="back-div"></div>
                  <div class="side-story-wrapper">
                    <div class="side-story-container">
                      <div class="side-story-img-container">
                        <span class="side-story-img-item">
                          <img class="side-story-img" src="${this.data.img}">
                        </span>
                      </div>
                      <div class="side-story-text-container">
                        <span class="side-story-text">${this.data.name}</span>
                      </div>
                    </div>
                  </div>
                  <img src="${this.data.storyImg[0]}">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return container.innerHTML;
  }
}


window.customElements.define('storyview-component', StoryView);