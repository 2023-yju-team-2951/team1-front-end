import Main from '../../pages/Main';
import PostModal from '../PostModal';
import './Nav.css';

/**
 * TODO:
 * 1. 홈 버튼: 클릭 시 fetch 후, window의 스크롤을 최상단으로 이동
 * 2. 검색 버튼: 클릭 시 검색하는 창 띄우기 sidebar 옆으로
 * 3. 만들기 버튼: 클릭 시 `사진과 동영상을 끌어다 놓으세요` 컴포넌트 작성
 * 4. 더 보기 버튼
 *  - 설정 버튼: 클릭 시 설정 페이지로 이동
 *  - 내 활동 버튼: 클릭 시 내 활동 페이지로 이동
 *  - 모드 전환: 클릭 시 dropdown 메뉴로 `라이트 모드`와 `어두운 모드` 표시하는 컴포넌트 띄우기
 *  - 로그아웃: 클릭시 로그아웃
 */

class Nav extends HTMLDivElement {
  constructor() {
    super();

    this.classList.add(
      'nav-full',
      'd-flex',
      'flex-column',
      'align-items-start',
      'px-12',
      'pt-8',
      'pb-20'
    );

    this.innerHTML = `
      <div class="nav-header-logo d-flex flex-row align-items-start p-10 gap-10">
        <div class="header-logo d-flex flex-column justify-content-center align-items-start p-0 gap-10">
          <div>
            <object data="/assets/image/insta-logo.svg"></object>
          </div>
        </div>
      </div>
      <div class="nav-list-contain d-flex flex-column justify-content-between align-items-center p-0 flex-fill">
        <ul class="nav-list d-flex flex-column justify-content-center align-items-start p-0">
          <li class="nav-home nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/home.svg"></object>
              <span class="item-name">홈</span>
            </div>
          </li>
          <li class="nav-search nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/search.svg"></object>
              <span class="item-name">검색</span>
            </div>
          </li>
          <li class="nav-add nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/add.svg"></object>
              <span class="item-name">만들기</span>
            </div>
          </li>
        </ul>
        <div class="dropup">
          <div class="nav-other d-flex flex-row align-items-center p-12 gap-12 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <object data="/assets/image/icons/other.svg"></object>
            <span class="item-name">더 보기</span>
          </div>
          <div class="dropdown-menu other-menu ">  
            <div class="d-flex flex-column p-10">
              <a class="other-settings othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/settings.svg"></object>
                  <span class="item-name">설정</span>
                </div>
              </a>
              <a class="other-activities othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/activities.svg"></object>
                  <span class="item-name">내 활동</span>
                </div>
              </a>
              <a class="other-logout othermenu-item">
                <div class="d-flex p-16">
                  <span class="item-name">로그아웃</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // 1. 홈 버튼: 클릭 시 fetch 후 (`root` 모든 것을 재 렌더링), window의 스크롤을 최상단으로 이동
    this.querySelector('.nav-home').addEventListener('click', this.homeEvent);

    // 2. 검색 버튼: 클릭 시 검색하는 창 띄우기 sidebar 옆으로
    this.querySelector('.nav-search').addEventListener('click', () => {});

    // 3. 만들기 버튼: 클릭 시 `사진과 동영상을 끌어다 놓으세요` 컴포넌트 작성
    this.querySelector('.nav-add').addEventListener('click', this.addEvent);

    /**
     * TODO: faze 2
     * 4. 더 보기 버튼
     *  - 설정 버튼: 클릭 시 설정 페이지로 이동
     *  - 내 활동 버튼: 클릭 시 내 활동 페이지로 이동
     *  - 로그아웃: 클릭시 로그아웃
     */
    this.querySelector('.other-settings').addEventListener('click', () => {});
    this.querySelector('.other-activities').addEventListener('click', () => {});
  }

  homeEvent() {
    const root = document.querySelector('#root');
    root.innerHTML = new Main().getHtml();
  }

  addEvent() {
    const old = document.querySelector('.modal');
    old.parentNode.replaceChild(new PostModal(), old);
  }
}

window.customElements.define('nav-component', Nav, { extends: 'div' });
