import '../components/Header';
import '../components/Nav';
import '../components/Post';

export default class {
  constructor() {
    document.title = 'Main';
  }
  getHtml() {
    return `
      <!-- test
      <div class="main">
        <div class="main-body">
          <Header-component></Header-component>

          <div class="inner">
            <post-container></post-container>
          </div>
          
        </div>
      </div>
      -->
      <div is="nav-component"></div>
    `;
  }
}
