import '../components/StoryView/storyview.css';
import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  getHtml() {
    return `
    <div class="story-view-modal">
      <div class="story-modal-body">
        <div class="out-box">
          <a data-link href="/">
            X
          </a>
        </div>
        <storyview-component></storyview-component>
      </div>
    </div>
    `;
  }
}
