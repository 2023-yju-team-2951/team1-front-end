import '../components/Card';
export default class {
  constructor() {
    document.title = 'Main';
  }
  async getHtml() {
    return `
      <card-component></card-component>
    `;
  }
}
