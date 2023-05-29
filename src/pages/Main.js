import '../components/Header'

export default class {
  constructor() {
    document.title = 'Main';
  }
  async getHtml() {
    return `
      <Header-component>
      </Header-component>

      <a href="/login" data-link>Go to Login</a>
      <a href="/story" data-link>Go to Story</a>
    `;
  }
}