import './rightSide.css';
import '../Story';
import Post from '../Post';
import { getAccountById} from '../../api/accounts';
import { getCategories } from '../../api/categories';

class RightNav extends HTMLElement {
  constructor() { 
    super();

    this.testId = 7;
    
    this.loadDatas();
  }

  async loadDatas() {
    try {
      this.data = await getAccountById(this.testId);
      this.category = await getCategories();
      this.render();
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {

    this.innerHTML = 
    `
    <div class="right-nav-container">
      <div class="right-nav-box">

        <div class="right-nav-header">
          <div class="category-info">
            <div class="category-info-img-box">
              <div class="category-info-img">
                <img src="${this.data.img}" alt="프로필 사진">
              </div>
            </div>   
            <div class="category-info-text">
              <span class="info-nickname">${this.data.nickname}</span>
              <span class="info-name">${this.data.name}</span>
            </div>
          </div>
        </div>

        <div class="right-nav-body">
          <div class="right-nav-body-header">카테고리</div>
          <div class="right-nav-body-content">
            <div class="right-nav-body-content-item">
              ${new NavItem(this.category).render()}
            </div>
          </div>
        </div>

      </div>
    </div>
    `

    const rightNavItems = this.querySelectorAll('.right-nav-item');
    rightNavItems.forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const postContainer = document.querySelector('post-container');
        postContainer.parentNode.replaceChild(new Post(id), postContainer);
      })
    })
  }
}

class NavItem {
  constructor(data) {
    this.data = data;
    console.log(data);
    this.render();
  }

  render() {
    let NavItem = document.createElement('div');

    this.data.forEach((item) => {
      NavItem.innerHTML +=
        `
        <div class="right-nav-item" data-id="${item.id}">
          <div class="right-nav-item-contain">
            <div class="category-info">
              <div class="category-info-img-box">
                <div class="category-info-img">
                  <img src="${item.img}" alt="프로필 사진">
                </div>
              </div>
              <div class="category-info-text">
                <span class="info-nickname">${item.name}</span>
                <span class="info-name">${item.info}</span>
              </div>
            </div>
          </div>  
        </div>
      `
    })

    return NavItem.innerHTML;
   
  }
}

 window.customElements.define('rightnav-component', RightNav);