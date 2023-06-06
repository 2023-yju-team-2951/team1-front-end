import './storyView.css'
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
        this.createStoryContainer(prevData, 'left');
      }

      // 중앙 스토리
      const middleData = this.data[index];
      this.createStoryContainer(middleData, 'center');

      // 맨 마지막 스토리가 아니면 오른쪽 스토리 생성
      if(index < this.data.length - 1) {
        const nextData = this.data[index + 1];
        this.createStoryContainer(nextData, 'right');
      }
    }

  }

  createStoryContainer(data, className) {
    const container = document.createElement('div');

    if (className === 'center') {
      container.className = `story-container ${className}`;
    } else {
      container.className = `story-container ${className}`;
    }

    if (className !== 'center') {
      container.style.transform = 'scale(0.5)'
      container.ariaDisabled = true;
    }

    this.modalWrapper.appendChild(container);

    container.addEventListener('click', () => {    
      const currentId = parseInt(new URLSearchParams(window.location.search).get('id'));

      if (currentId === data.id) {
        return;
      }

      const originalStory = document.querySelector('.story-container.center');
      const sideStoryLeft = document.querySelector('.story-container.left');
      const sideStoryRight = document.querySelector('.story-container.right');
      
      // 선택한 스토리의 ID가 주소창의 ID보다 큰지 작은지 판단

      let direction = '';
      
      if (data.id === 1 || data.id === this.data.length - 1 && currentId === this.data.length) {
        direction = 'endLeft'
      } else if (data.id === this.data.length || data.id === 2 && currentId === 1) {
        direction = 'endRight'
      } else {
        direction = data.id > currentId ? 'right' : 'left';
      }

      const wrapper = document.querySelector('.modal-wrapper');
    
      // GSAP Timeline 생성
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
    
      // 클릭한 스토리 애니메이션 추가
      if (direction === 'right') {
        // 클릭한 스토리가 오른쪽에 있을 때
        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1, 
            scale: 1.25,
            x: `-150%`,
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '-150%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1,
            x: '-150%',
            opacity: 0,
          }),
          '<'
        )
      } else if (direction === 'endLeft') {
        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1, 
            scale: 1.25,
            x: '75%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '75%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1,
            x: '75%',
            opacity: 0,
          }),
          '<'
        )
      } else if (direction === 'endRight') {
        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1, 
            scale: 1.25,
            x: '-75%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '-75%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1,
            x: '-75%',
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
            scale: 1.25,
            x: '150%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1,
            scale: 0.25, 
            x: '150%',
          }),
          '<' // 이전 애니메이션과 동시에 실행
        );

        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1,
            x: '150%',
            opacity: 0,
          }),
          '<'
        )
      }
    });
    
        
    if (className === 'center') {
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
      storyName.textContent = data.name;

      const storySmallImg = document.createElement('img');
      storySmallImg.className = 'story-small-img';
      storySmallImg.src = data.img;

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

      const carouselSlide = document.createElement('div');
      carouselSlide.className = 'carousel slide';
      carouselSlide.id = 'carouselAuto';
      carouselSlide.setAttribute('data-bs-ride', 'carousel');

      const carouselIndicators = document.createElement('div');
      carouselIndicators.className = 'carousel-indicators';

      const carouselInner = document.createElement('div');
      carouselInner.className = 'carousel-inner';


      if (Array.isArray(data.storyImg)) {

        for (let i = 0; i < data.storyImg.length; i++) {
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
    
          const img = document.createElement('img');
          img.src = data.storyImg[i];

          carouselItem.appendChild(img);
          carouselInner.appendChild(carouselItem);
          carouselIndicators.appendChild(carouselIndicator);

          if (Array.isArray(data.storyText)) {
            const text = document.createElement('div');
            text.className = 'text';
            text.innerHTML = data.storyText[i];

            carouselItem.appendChild(text);
          }
          
        }
      }

      carouselSlide.appendChild(carouselInner);
      carouselSlide.appendChild(carouselIndicators);
      imgSize.appendChild(carouselSlide);
      imgContainer.appendChild(imgSize);
      storyItem.appendChild(imgContainer);
      slideBtnNext.appendChild(nextBtn);
      slideBtnPrev.appendChild(prevBtn);
      storyItem.appendChild(slideBtnNext);
      storyItem.appendChild(slideBtnPrev);
      storyTitle.appendChild(storySmallImg);
      storyTitle.appendChild(storyName);
      storyHeader.appendChild(storyTitle);
      storyItem.appendChild(storyHeader);
      modalStory.appendChild(storyItem);
      container.appendChild(modalStory);
      
    } 
    else {
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
      sideStoryImg.src = data.img;

      const sideStoryTextContainer = document.createElement('div');
      sideStoryTextContainer.className = 'side-story-text-container';

      const sideStoryText = document.createElement('span');
      sideStoryText.className = 'side-story-text';
      sideStoryText.textContent = data.name;

      const img = document.createElement('img');
      img.src = data.storyImg[0];

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
    }
  }
  
  sizeChange() {
    this.reSize();
  
    window.addEventListener('resize', () => {
      this.reSize();
    });
  }
  
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
  
}

window.customElements.define('storyview-component', StoryView);
