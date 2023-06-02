import './storyView.css'
import { data } from '../Story/dataTest.js'
import { gsap } from "gsap";

class StoryView extends HTMLElement {
  constructor() {   
    super();
    this.data = data;
    this.storyWrapper = document.createElement('div');
    this.storyWrapper.className = 'story-modal-wrapper';
    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';
    this.render();
    this.sizeChange();
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
    // container.className = `story-container`;
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
            scale: 1.28,
            x: '-155%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '-155%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1,
            x: '-155%',
            opacity: 0,
          }),
          '<'
        )
      } else if (direction === 'endLeft') {
        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1, 
            scale: 1.28,
            x: '80%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '80%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1,
            x: '80%',
            opacity: 0,
          }),
          '<'
        )
      } else if (direction === 'endRight') {
        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1, 
            scale: 1.28,
            x: '-80%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1, 
            scale: 0.25,
            x: '-80%',
          }),
          '<'
        );

        tl.add(
          gsap.to(sideStoryLeft, {
            duration: 1,
            x: '-80%',
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
            scale: 1.28,
            x: '155%',
          })
        );
    
        tl.add(
          gsap.to(originalStory, {
            duration: 1,
            scale: 0.25, 
            x: '155%',
          }),
          '<' // 이전 애니메이션과 동시에 실행
        );

        tl.add(
          gsap.to(sideStoryRight, {
            duration: 1,
            x: '155%',
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

      container.appendChild(sideStory);
      sideStory.appendChild(imgContainer);
      imgContainer.appendChild(imgSize);
      imgSize.appendChild(imgItem);
      imgItem.appendChild(imgDiv);
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
