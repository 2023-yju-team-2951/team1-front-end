import { getPost } from '../../api/posts.js';
import './post.css'

class Post extends HTMLElement {
  constructor() {
    super();

    this.innerContainer = document.createElement('div');
    this.innerContainer.className = 'inner-container'
    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'card-container';
  
    this.loadDatas();
  }

  async loadDatas() {
    try {
      this.data = await getPost();
      console.log(this.data);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this.cardContainer.innerHTML += new CardContainer(this.data).render();

    this.innerContainer.appendChild(this.cardContainer);

    this.appendChild(this.innerContainer);

    const heartIcons = document.querySelectorAll('.user-heart-icon');
    heartIcons.forEach((heartIcon) => {
      heartIcon.addEventListener('click', () => {
        this.hearClick();
      });
    });
  }

  hearClick() {
    console.log("heartClick");
  }
}

class CardContainer {
  constructor(data) {
    this.data = data;
  }

  render() {
    let cardContainer = document.createElement('div');

    this.data.forEach((card) => {
      let cardHTML = document.createElement('div');
      cardHTML.className = 'card';

      const top = new Top(card);
      cardHTML.innerHTML += top.render();
      const main = new MainPost(card);
      cardHTML.innerHTML += main.render();

      cardHTML.innerHTML += `<div class="post-footer"> </div>`;

      let footer = cardHTML.querySelector('.post-footer');

      const userWrite = new UserWrite(card);
      footer.innerHTML += userWrite.render();
      const comment = new Comment(card);
      footer.innerHTML += comment.render();

      cardContainer.appendChild(cardHTML);
    });

    return cardContainer.innerHTML;
  }

  const 
}

class Top {
  constructor(data) {
    this.data = data;
  }

  render() {
    let topHTML = document.createElement('div');

    topHTML.innerHTML += `
      <div class="top">
        <div class="top-container">
          <div class="top-item-image">
            <img class="top-img" src="${this.data.post_top_img}" alt="test">
          </div>
          <div class="top-item-account">
            <span class="account">
              <strong id="userAcct">${this.data.name}</strong>
            </span>
          </div>
        </div>
      </div>
    `;

    return topHTML.innerHTML;
  }
}

class MainPost {
  constructor(data) {
    this.data = data;
  }

  render() {
    let mainHTML = document.createElement('div');

    mainHTML.innerHTML += `
      <div class="main-container">
        <div class="items">
        </div>
      </div>
      
    `
    let items = mainHTML.querySelector('.items');

    const carouselImg = new CarouselImg(this.data);
    items.innerHTML += carouselImg.render();
    
    return mainHTML.innerHTML;
  }
}

class UserWrite {
  constructor(data) {
    this.data = data;
  }

  render() {
    let userWriteHTML = document.createElement('div');

    userWriteHTML.innerHTML += `
      <div class="user-heart">
        <div class="user-heart-icon">
          <span class="material-symbols-outlined">
            favorite
          </span>
        </div>
      </div>
      <div class="user-count">
          <strong>${this.data.likes}</strong>
          <div class="user-like">명이 좋아합니다</div>
      </div>
      <div class="user-write">
        <div class="user-tag">
          <span id="account">${this.data.name}</span>
          <div class="post-content">
            <span class="post">
              ${this.data.post_content} 
            </span>
          </div> 
          <span id="showMore">더보기</span>
        </div>
      </div>
      <span id="showAll">댓글 모두 보기</span>
    `;

    return userWriteHTML.innerHTML;
  }
}

class Comment {
  constructor(data) {
    this.data = data;
  }

  render() {
    let commentHTML = document.createElement('div');

    commentHTML.innerHTML += `
      <div class="comment">
        <textarea class="comment-input" aria-label="댓글 달기..." placeholder="댓글 달기..." id="myField"></textarea> 
      </div>
    `;

    return commentHTML.innerHTML;
  }
}

class CarouselImg {
  constructor(data) {
    this.data = data;
  }
  render() {
    const carouselSlide = document.createElement('div');
    carouselSlide.className = 'carousel slide';
    carouselSlide.id = 'carouselAuto';
    carouselSlide.setAttribute('data-bs-ride', 'carousel');

    const carouselControlPrev = document.createElement('button');
    carouselControlPrev.className = 'carousel-control-prev';
    carouselControlPrev.type = 'button';
    carouselControlPrev.setAttribute('data-bs-target', '#carouselAuto');
    carouselControlPrev.setAttribute('data-bs-slide', 'prev');

    const carouselControlPrevIcon = document.createElement('span');
    carouselControlPrevIcon.className = 'carousel-control-prev-icon';
    carouselControlPrevIcon.setAttribute('aria-hidden', 'true');

    const carouselControlPrevSpan = document.createElement('span');
    carouselControlPrevSpan.className = 'visually-hidden';
    carouselControlPrevSpan.innerText = 'Previous';

    const carouselControlNext = document.createElement('button');
    carouselControlNext.className = 'carousel-control-next';
    carouselControlNext.type = 'button';
    carouselControlNext.setAttribute('data-bs-target', '#carouselAuto');
    carouselControlNext.setAttribute('data-bs-slide', 'next');

    const carouselControlNextIcon = document.createElement('span');
    carouselControlNextIcon.className = 'carousel-control-next-icon';
    carouselControlNextIcon.setAttribute('aria-hidden', 'true');

    const carouselControlNextSpan = document.createElement('span');
    carouselControlNextSpan.className = 'visually-hidden';
    carouselControlNextSpan.innerText = 'Next';

    const carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';


    if (Array.isArray(this.data.post_main_img)) {

      for (let i = 0; i < this.data.post_main_img.length; i++) {
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
        if (/^http.*/.test(this.data.post_main_img[i])) {
          img.style.background = `url(${this.data.post_main_img[i]})`;
        } else {
          img.style.background = this.data.post_main_img[i];
        }
        
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(carouselIndicator);
      }
    }

    carouselSlide.appendChild(carouselIndicators);
    carouselSlide.appendChild(carouselInner);
    carouselControlPrev.appendChild(carouselControlPrevIcon);
    carouselControlPrev.appendChild(carouselControlPrevSpan);
    carouselControlNext.appendChild(carouselControlNextIcon);
    carouselControlNext.appendChild(carouselControlNextSpan);
    carouselSlide.appendChild(carouselControlPrev);
    carouselSlide.appendChild(carouselControlNext);

    return carouselSlide.outerHTML;
  }
}

window.customElements.define('post-container', Post);
