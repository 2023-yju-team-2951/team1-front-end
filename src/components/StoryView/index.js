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
      console.log(this.data);
      this.render();
      this.sizeChange();
    } catch (error) {
      console.log(error);
    } 
  }

  render() {
    this.appendChild(this.storyWrapper);
    this.storyWrapper.appendChild(this.modalWrapper);

    // 주소에서 id 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    
    // 데이터에서 id 값이 같은 데이터의 인덱스번호 가져오기
    const index = this.data.findIndex((data) => data.id === id);

    // 스토리 생성
    if(index !== -1) {

      // 첫번째 스토리가 아니면 왼쪽 스토리 생성
      if(index > 0) {
        const prevData = this.data[index - 1];
        const leftStory = new SideStory(prevData);
        this.modalWrapper.appendChild(leftStory.render('left'));
      }

      // 중앙 스토리
      const middleData = this.data[index];
      const centerStory = new CenterStory(middleData);
      this.modalWrapper.appendChild(centerStory.render());

      // 맨 마지막 스토리가 아니면 오른쪽 스토리 생성
      if(index < this.data.length - 1) {
        const nextData = this.data[index + 1];
        const rightStory = new SideStory(nextData);
        this.modalWrapper.appendChild(rightStory.render('right'));
      }
    }

    const leftStory = this.modalWrapper.querySelector('.story-container.left');
    const rightStory = this.modalWrapper.querySelector('.story-container.right');
    
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
    console.log(this.data.length);
    console.log(currentId);

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

    console.log(direction);

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
    const container = document.createElement('div');
    container.className = 'story-container center';

    const modalStory = document.createElement('div');
    modalStory.className = 'modal-story';

    const storyItem = document.createElement('div');
    storyItem.className = 'story-item';

    const storyHeader = document.createElement('div');
    storyHeader.className = 'story-header';

    const storyTitle = document.createElement('div');
    storyTitle.className = 'story-title';

    const storyName = document.createElement('div');
    storyName.className = 'story-name';
    storyName.textContent = this.data.name;

    const storySmallImg = document.createElement('img');
    storySmallImg.className = 'story-small-img';
    storySmallImg.src = this.data.img;

    const slideBtnPrev = document.createElement('button');
    slideBtnPrev.className = 'slide-button prevB';
    slideBtnPrev.type = 'button';
    slideBtnPrev.setAttribute('data-bs-target', '#carouselAuto');
    slideBtnPrev.setAttribute('data-bs-slide', 'prev');

    const slideBtnNext = document.createElement('button');
    slideBtnNext.className = 'slide-button nextB';
    slideBtnNext.type = 'button';
    slideBtnNext.setAttribute('data-bs-target', '#carouselAuto');
    slideBtnNext.setAttribute('data-bs-slide', 'next');

    const prevBtn = document.createElement('div');
    prevBtn.className = 'btn-prev';

    const nextBtn = document.createElement('div');
    nextBtn.className = 'btn-next';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const imgSize = document.createElement('div');
    imgSize.className = 'img-size';

    container.appendChild(modalStory);
    modalStory.appendChild(storyItem);
    storyItem.appendChild(storyHeader);
    storyHeader.appendChild(storyTitle);
    storyTitle.appendChild(storyName);
    storyTitle.appendChild(storySmallImg);
    storyItem.appendChild(slideBtnPrev);
    slideBtnPrev.appendChild(prevBtn);
    storyItem.appendChild(slideBtnNext);
    slideBtnNext.appendChild(nextBtn);
    storyItem.appendChild(imgContainer);
    imgContainer.appendChild(imgSize);

    const carouselImg = new CarouselImg(this.data);
    imgSize.appendChild(carouselImg.render());

    return container;
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


    if (Array.isArray(this.data.storyImg)) {

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

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(carouselIndicator);

        if (Array.isArray(this.data.storyText)) {
          const text = document.createElement('div');
          text.className = 'text';
          text.innerHTML = this.data.storyText[i];

          carouselItem.appendChild(text);
        }
        
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
    container.className = `story-container ${name}`;
    container.style.transform = 'scale(0.5)'

    const sideStory = document.createElement('div');
    sideStory.className = 'side-story';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const imgSize = document.createElement('div');
    imgSize.className = 'img-size';

    const imgItem = document.createElement('div');
    imgItem.className = 'img-item';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'img-div';

    const backDiv = document.createElement('div');
    backDiv.className = 'back-div';

    const sideStoryWrapper = document.createElement('div');
    sideStoryWrapper.className = 'side-story-wrapper';

    const sideStoryContainer = document.createElement('div');
    sideStoryContainer.className = 'side-story-container';

    const sideStoryImgContainer = document.createElement('div');
    sideStoryImgContainer.className = 'side-story-img-container';

    const sideStoryImgItem = document.createElement('span');
    sideStoryImgItem.className = 'side-story-img-item';

    const sideStoryImg = document.createElement('img');
    sideStoryImg.className = 'side-story-img';
    sideStoryImg.src = this.data.img;

    const sideStoryTextContainer = document.createElement('div');
    sideStoryTextContainer.className = 'side-story-text-container';

    const sideStoryText = document.createElement('span');
    sideStoryText.className = 'side-story-text';
    sideStoryText.textContent = this.data.name;

    const img = document.createElement('img');
    img.src = this.data.storyImg[0];

    container.appendChild(sideStory);
    sideStory.appendChild(imgContainer);
    imgContainer.appendChild(imgSize);
    imgSize.appendChild(imgItem);
    imgItem.appendChild(imgDiv);
    imgDiv.appendChild(backDiv);
    imgDiv.appendChild(sideStoryWrapper);
    sideStoryWrapper.appendChild(sideStoryContainer);
    sideStoryContainer.appendChild(sideStoryImgContainer);
    sideStoryImgContainer.appendChild(sideStoryImgItem);
    sideStoryImgItem.appendChild(sideStoryImg);
    sideStoryContainer.appendChild(sideStoryTextContainer);
    sideStoryTextContainer.appendChild(sideStoryText);
    imgDiv.appendChild(img);

    return container;
  }
}

window.customElements.define('storyview-component', StoryView);
