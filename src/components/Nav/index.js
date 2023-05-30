import './Nav.css';
class Nav extends HTMLElement {
  constructor() {
    super();
    // this.innerHTML = `
    //   <div class="nav-full d-flex flex-column align-items-start px-12 pt-8 pb-20">
    //     <div class="nav-header-logo d-flex flex-row align-items-start p-10 gap-10">
    //       <div class="header-logo d-flex flex-column justify-content-center align-items-start p-0 gap-10">
    //         <!-- { TODO: div > vector logo} -->
    //         <div>
    //           <object data="/assets/image/insta-logo.svg"></object>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="nav-list-contain d-flex flex-column justify-content-between align-items-center p-0 flex-fill">
    //       <ul class="nav-list d-flex flex-column justify-content-center align-items-start p-0">
    //         <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
    //           <!-- { TODO: div > vector logo, item name } -->
    //           <div>
    //             <object data="/assets/image/icons/home.svg"></object>
    //             홈
    //           </div>
    //         </li>
    //         <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
    //           <div>
    //             <object data="/assets/image/icons/search.svg"></object>
    //             검색
    //           </div>
    //         </li>
    //         <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
    //           <div>
    //             <object data="/assets/image/icons/add.svg"></object>
    //             만들기
    //           </div>
    //         </li>
    //       </ul>
    //       <div class="nav-other d-flex flex-row align-items-center p-12 gap-12">
    //         <object data="/assets/image/icons/other.svg"></object>
    //         <div>더 보기</div>
    //       </div>
    //     </div>
    //   </div>

    // `;
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
              홈
            </div>
          </li>
          <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/search.svg"></object>
              검색
            </div>
          </li>
          <li class="nav-item d-flex flex-row align-items-center p-12 gap-12">
            <div>
              <object data="/assets/image/icons/add.svg"></object>
              만들기
            </div>
          </li>
        </ul>
        <div class="dropup">
          <div class="nav-other d-flex flex-row align-items-center p-12 gap-12 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <object data="/assets/image/icons/other.svg"></object>
            <div>더 보기</div>
          </div>
          <ul class="dropdown-menu other-menu">  
            <!-- TODO: <li> width, height = { 250, 50 }(px) -->
            <li><a class="othermenu-item" href="#">Select 1</a></li>
            <li><a class="othermenu-item" href="#">Select 2</a></li>
            <li><a class="othermenu-item" href="#">Select 3</a></li>
            <li><a class="othermenu-item" href="#">Select 4</a></li>
          </ul>
        </div>

      </div>
    </div>
  `;
  }
}

window.customElements.define('nav-component', Nav);
