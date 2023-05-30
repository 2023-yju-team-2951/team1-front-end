import '../components/StoryView/storyview.css'
import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  async getHtml() {
    return `
    <div class="story-modal">
      <div class="story-modal-body">
        <div class="story-modal-wrapper">
          <div class="wrapper">
           <storyview-component></storyview-component>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}