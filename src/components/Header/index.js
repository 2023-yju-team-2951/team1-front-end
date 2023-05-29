import './Header.css';
import '../Story';

class Header extends HTMLElement {
  constructor() { 
    super();

    this.currentOffset = 0;
    
    this.innerHTML = 
    `
    <div class="main">
      <div class="main-body">
        <div class="menu-wrapper">
          <div class="menu">
            <div class="story-wrapper">
              <story-component class="sty"></story-component>
            </div>
            <button class="slider-button prev">
                <div class="btn"></div>
              </button>
              <button class="slider-button next">
                  <div class="btn"></div>
              </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  prevBtnHidden(button) {
    if (this.currentOffset < 0) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  }
  
  nextBtnHidden(button) {
    const sliderWrapper = this.querySelector(".story-wrapper");
    const sliderWidth = sliderWrapper.scrollWidth;
    const containerWidth = sliderWrapper.offsetWidth;
    const minOffset = -(sliderWidth - containerWidth);
  
    if (this.currentOffset == minOffset) {
      button.classList.add("hidden");
    } else {
      button.classList.remove("hidden");
    }
  }
  
  connectedCallback() {
    const prevButton = this.querySelector(".prev");
    const nextButton = this.querySelector(".next");
    this.prevBtnHidden(prevButton);
    this.nextBtnHidden(nextButton);

    const prev = this.querySelector(".prev");
    prev.addEventListener("click", () => {
      this.slidePrev();
    });

    const next = this.querySelector(".next");
    next.addEventListener("click", () => {
      this.slideNext();
    });
  }

  slidePrev() {
    const sliderWrapper = this.querySelector(".story-wrapper");
    const itemWidth = 80;
    const maxOffset = 0;
  
    if (this.currentOffset < maxOffset) {
      this.currentOffset += itemWidth;
      if(this.currentOffset > maxOffset){
        this.currentOffset = maxOffset;
      }
      sliderWrapper.scrollLeft = -this.currentOffset;
    }

    const prevButton = this.querySelector(".prev");
    this.prevBtnHidden(prevButton);
    const nextButton = this.querySelector(".next");
    this.nextBtnHidden(nextButton);
  }
  

  slideNext() {
    const sliderWrapper = this.querySelector(".story-wrapper");
    const sliderWidth = sliderWrapper.scrollWidth; // story-wrapper의 총 너비
    const itemWidth = 80; // 아이템 크기
    const containerWidth = sliderWrapper.offsetWidth; // 컨테이너의 너비
    const minOffset = -(sliderWidth - containerWidth);
    console.log(sliderWidth, containerWidth, minOffset)

    if (this.currentOffset > minOffset) {
      this.currentOffset -= itemWidth;
      if(this.currentOffset < minOffset){
        this.currentOffset = minOffset;
      }
      sliderWrapper.scrollLeft = -this.currentOffset;
    }

    const prevButton = this.querySelector(".prev");
    this.prevBtnHidden(prevButton);
    const nextButton = this.querySelector(".next");
    this.nextBtnHidden(nextButton);
  }

}

window.customElements.define('header-component', Header);

