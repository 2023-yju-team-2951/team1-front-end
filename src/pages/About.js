export default class {
  constructor() {
    document.title = 'About';
  }
  async getHtml() {
    return `
      <h1>About</h1>
    `
  }
}