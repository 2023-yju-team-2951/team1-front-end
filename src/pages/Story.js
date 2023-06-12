import '../components/StoryView/storyView.css';
import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  getHtml() {
    return `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <div class="story-view-modal">
      <div class="story-modal-body">
        <div class="out-box">
          <a data-link href="/">
            <span class="material-symbols-outlined">
              close
            </span>
          </a>
        </div>
        <storyview-component></storyview-component>
      </div>
    </div>
    `;
  }
}
