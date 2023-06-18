import './RightNav.css';
import '../Story';
import { getAccountById } from '../../api/accounts';
import Post from '../Post';
import { getCategories } from '../../api/categories';
import { exchangeComponent } from '../utils/exchangeComponent';

class RightNav extends HTMLElement {
  constructor(account) {
    super();

    this.account = account;
    this.categories = [];
    // this.testId = account.id;

    // this.loadDatas();

    // this.render();
  }

  async connectedCallback() {
    try {
      this.account = await getAccountById(this.testId);
      this.categories = await getCategories();
      console.log(this.categories);
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  // async loadDatas() {
  //   try {
  //     // this.data = await getAccountById(this.account.id);
  //     this.categories = await getCategories();
  //     console.log(this.categories);
  //     this.render();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    if (!this.account) {
      return;
    }
    this.innerHTML = `
    <div class="right-nav-container">
      <div class="right-nav-box">

        <div class="right-nav-header">
          <div class="category-info">
            <div class="category-info-img-box">
              <div class="category-info-img">
                <img src="${this.account.img}" alt="프로필 사진">
              </div>
            </div>   
            <div class="category-info-text">
              <span class="info-nickname">${this.account.nickname}</span>
              <span class="info-name">${this.account.name}</span>
            </div>
          </div>
        </div>

        <div class="right-nav-body">
          <div class="right-nav-body-header">카테고리</div>
          <div class="right-nav-body-content">
            <div class="right-nav-body-content-item">
              ${new NavItem(this.categories).render()}
            </div>
          </div>
        </div>

      </div>
    </div>
    `;

    const rightNavItems = this.querySelectorAll('.right-nav-item');
    rightNavItems.forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const postContainer = document.querySelector('post-container');
        exchangeComponent(postContainer, new Post(this.account, id));
      });
    });
  }
}

class NavItem {
  // data = categories의 개체
  constructor(data) {
    this.account = data;
    console.log(data);
    this.render();
  }

  render() {
    let NavItem = document.createElement('div');

    this.account.forEach((item) => {
      NavItem.innerHTML += `
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
      `;
    });

    return NavItem.innerHTML;
  }
}

window.customElements.define('rightnav-component', RightNav);

export default RightNav;
