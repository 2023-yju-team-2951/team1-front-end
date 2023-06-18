import '../components/Header';
import PostModal from '../components/Modal/PostModal';
import '../components/Nav';
import '../components/Post';
import '../components/RightNav';

export default class Main {
  constructor() {
    document.title = 'Main';
  }
  getHtml() {
    return `
      <div class="main">

        <div class="main-nav">
          <div is="nav-component"></div>
        </div>

        <main class="main-body-wrapper">

          <div class="right-body">
            <div class="main-body">
              <Header-component></Header-component>
              <div class="inner">
                <post-container></post-container>
              </div>
            </div>

            <div class="right-nav">
              <rightnav-component></rightnav-component>
            </div>
          </div>
          
        </div>

      </div>
    `;
  }
}
