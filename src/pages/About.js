import Abstract from "./Abstract";

export default class extends Abstract {
  constructor() {
    super();
  }

  async getHtml() {
    return `
      <h1>어바웃 페이지</h1>
    `;
  }
}