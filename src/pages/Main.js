import '../components/Header';
import '../components/Nav';

export default class {
  constructor() {
    document.title = 'Main';
  }
  getHtml() {
    return `
      <Header-component></Header-component>
      <Nav-component></Nav-component>
    `;
  }
}
