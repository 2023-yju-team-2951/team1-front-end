import '../components/Header';
import '../components/Nav';
import '../components/Post';

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
        <div class="main-body">
          <Header-component></Header-component>

          <div class="inner">
            <post-container></post-container>
          </div>
          
        </div>
      </div>
    `;
  }
}
