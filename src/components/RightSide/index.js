import './rightSide.css';
import '../Story';
import { getAccountById} from '../../api/accounts';

class RightNav extends HTMLElement {
  constructor() { 
    super();

    this.testId = 7;

    this.loadDatas();
  }

  async loadDatas() {
    try {
      this.data = await getAccountById(this.testId);
      console.log(this.data);
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
      <div class="right-nav">

        <div class="right-nav-header">
          <div class="login-info">
            <div class="login-info-img">
              <img src="${this.data.img}" alt="프로필 사진">
            </div>
            <div class="login-info-text">
            </div>
          </div>
        </div>

        <div class="right-nav-body">

        </div>

      </div>
    </div>
    `

  }
}


 window.customElements.define('rightnav-component', RightNav);