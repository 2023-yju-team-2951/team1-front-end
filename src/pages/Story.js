import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  async getHtml() {
    return `
      <storyview-component></storyview-component>
    `;
  }
}