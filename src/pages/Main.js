import '../components/Header';
import '../components/Nav';

export default class {
  constructor() {
    document.title = 'Main';
  }
  async getHtml() {
    return `
      <Header-component> 
      </Header-component>
    `;
  }
}
