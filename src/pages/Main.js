import '../components/Header'

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