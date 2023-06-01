import '../components/StoryView/storyView.css'
import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  async getHtml() {
    return `
    <div class="story-modal">
      <div class="story-modal-body">
        <storyview-component></storyview-component>
      </div>
    </div>
    `;
  }
}   