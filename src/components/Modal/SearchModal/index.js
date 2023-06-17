import PostModal from '../PostModal';
import { getPost } from '../../../api/posts';
import { exchangeModal } from '../../utils/exchangeModal';
import './SearchModal.css';

/**
 * text에서 keyword를 찾아서 하이라이트 처리한다.
 * @param {string} text
 * @param {string} keyword
 * @returns {string} 하이라이트 처리된 text
 */
function highlight(text, keyword) {
  const regex = new RegExp(keyword, 'gi');

  return text.replace(regex, `<span class="highlight">${keyword}</span>`);
}

class SearchModal extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('search-modal', 'modal-dialog');
    this.setAttribute('role', 'document');

    this.contents = [];

    this.innerHTML = `
      <div class="search-box">
        <div class="search-bar">
          <input type="text" name="searchInput" id="searchInput" autocomplete="off" autofocus>
          <button class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="content-list"></div>
      </div>
    `;

    this.searchInput = this.querySelector('#searchInput');
    this.searchInput.addEventListener('keyup', (e) =>
      this.searchContents(e.target.value)
    );

    this.contentList = this.querySelector('.content-list');
  }

  async connectedCallback() {
    this.contents = await getPost();
  }

  searchContents(keyword) {
    const contents = this.contents.filter(({ post_content }) =>
      post_content.includes(keyword)
    );

    this.renderContents(contents, keyword);
  }

  renderContents(contents, keyword) {
    this.contentList.innerHTML = ``;
    contents.forEach((content) => {
      const newPostContent = highlight(content.post_content, keyword);

      const newContent = { ...content, post_content: newPostContent };

      this.contentList.appendChild(new Content(newContent));
    });
  }
}

class Content extends HTMLDivElement {
  constructor(post) {
    super();
    this.classList.add('content-item');

    this.post = post;

    this.innerHTML = `
      <span class="content">${post.post_content}</span>
      <span class="username">${post.name}</span>
      <img src="${post.post_top_img}" alt="">
    `;

    this.addEventListener('click', () => {
      exchangeModal(new PostModal(post));
    });
  }
}

window.customElements.define('content-item', Content, { extends: 'div' });
window.customElements.define('search-modal', SearchModal, { extends: 'div' });

export default SearchModal;
