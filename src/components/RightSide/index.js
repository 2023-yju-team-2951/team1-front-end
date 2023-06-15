import './rightSide.css';
import '../Story';
import { getAccountById} from '../../api/accounts';

class RightNav extends HTMLElement {
  constructor() { 
    super();

    this.testId = 7;

    this.category = [
      {
        name: '후쿠오카 현지학기제',
        img: 'https://cdn.pixabay.com/photo/2018/07/24/07/40/fukuoka-3558614_1280.jpg',
        info: '후쿠오카 현지학기제에 관한 정보입니다'
      },
      {
        name: '후쿠오카 여행소개',
        img: 'https://cdn.pixabay.com/photo/2020/03/30/01/55/japan-4982777_1280.jpg',
        info: '후쿠오카 여행소개에 관한 정보입니다'
      },
      {
        name: '후쿠오카 맛집',
        img: 'https://cdn.pixabay.com/photo/2021/10/28/00/29/ramen-6748518_1280.jpg',
        info: '후쿠오카 맛집에 관한 정보입니다'
      }
    ]

    this.loadDatas();
  }

  async loadDatas() {
    try {
      this.data = await getAccountById(this.testId);
      this.render();
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    let RightNav = document.createElement('div');

    RightNav

    this.innerHTML = 
    `
    <div class="right-nav-container">
      <div class="right-nav">

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

  }
}

class NavItem {
  constructor(data) {
    this.data = data;

    this.render();
  }

  render() {
    let NavItem = document.createElement('div');

    this.data.forEach((item) => {
      NavItem.innerHTML +=
        `
        <div class="right-nav-item">
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