import '../components/Header/Header.js'

export default class {
  constructor() {
    document.title = 'Main';
  }
  async getHtml() {
    return `
      <Header-component></Header-component>
      <h1>Main</h1>
      <h1>asd</h1>
    `;
  }
}