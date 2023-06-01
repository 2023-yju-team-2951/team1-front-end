import './Nav.css';
class Nav extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="nav-full d-flex flex-column align-items-start px-12 pt-8 pb-20">
      <div class="nav-header-logo d-flex flex-row align-items-start p-10 gap-10">
        <div class="header-logo d-flex flex-column justify-content-center align-items-start p-0 gap-10">
          <!-- { TODO: div > vector logo} -->
          <div>
            <object data="/assets/image/insta-logo.svg"></object>
          </div>
        </div>
      </div>
      <div class="nav-list-contain d-flex flex-column justify-content-between align-items-center p-0 flex-fill">
        <ul class="nav-list d-flex flex-column justify-content-center align-items-start p-0">
          <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
            <!-- { TODO: div > vector logo, item name } -->
            <div>
              <object data="/assets/image/icons/home.svg"></object>
              <span class="item-name">홈</span>
            </div>
          </li>
          <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/search.svg"></object>
              <span class="item-name">검색</span>
            </div>
          </li>
          <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
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
              <!-- TODO: <a> width, height = { 250, 50 }(px) -->
              <a class="othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/setting.svg"></object>
                  <span class="item-name">설정</span>
                </div>
              </a>
              <a class="othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/activities.svg"></object>
                  <span class="item-name">내 활동</span>
                </div>
              </a>
              <a class="othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/saved.svg"></object>
                  <span class="item-name">저장됨</span>
                </div>
              </a>
              <a class="othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/mode-toggle.svg"></object>
                  <span class="item-name">모드 전환</span>
                </div>
              </a>
              <a class="othermenu-item">
                <div class="d-flex p-16">
                  <object data="/assets/image/icons/report.svg"></object>
                  <span class="item-name">문제 신고</span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
  }
}

window.customElements.define('nav-component', Nav);
