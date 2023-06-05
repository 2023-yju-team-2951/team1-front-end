import '../components/StoryView/storyView.css';
import '../components/StoryView';

export default class {
  constructor() {
    document.title = '스토리';
  }
  getHtml() {
    return `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <div class="story-modal">
      <div class="story-modal-body">
        <storyview-component></storyview-component>
      </div>
    </div>
    `;
  }
}
