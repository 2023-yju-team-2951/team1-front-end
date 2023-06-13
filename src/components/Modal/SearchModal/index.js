import { getPost } from '../../../api/posts';
import './SearchModal.css';
class SearchModal extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('search-modal', 'modal-dialog');
    this.setAttribute('role', 'document');

    this.contents = [
      {
        id: 1,
        name: 'test',
        post_top_img: 'https://github.com/HyunjinHa.png',
        post_main_img: [
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
        ],
        post_content: '안녕하세요',
        statements: [
          {
            visitor: '',
            comment:
              '逃れ逃れついたあるカフェ～～！すっごく居心地よくて時間のある方々にはぜひお勧めいたします！！流れてくる音楽も雰囲気とピッタリなので久々にのんびりしたい人たちにもいいと思います',
          },
        ],
        likes: '1',
      },
      {
        id: 2,
        name: '',
        post_top_img: '/img/ketty1.png',
        post_main_img: [
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
        ],
        post_content: '안녕하세요',
        statements: [
          {
            visitor: '',
            comment: '',
          },
        ],
        likes: '0',
      },
      {
        id: 3,
        name: '',
        post_top_img: '/img/ketty1.png',
        post_main_img: [
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
          'https://cdn.pixabay.com/photo/2022/01/22/00/32/bird-6956012_1280.png',
        ],
        post_content: '안녕하세요',
        statements: [
          {
            visitor: '',
            comment: '',
          },
        ],
        likes: '0',
      },
      {
        user: 'juhyeonni',
        post_content: 'asdfasdf👏',
        post_top_img: '',
        post_main_img: ['https://thumbsnap.com/i/k8HTBeTa.jpg'],
        statements: [],
        likes: 0,
        id: 4,
      },
    ];

    // TODO: 미완성
    this.innerHTML = `
      <div class="search-box">
        <div class="search-bar">
          <input type="text" name="searchInput" id="searchInput" autofocus>
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

    console.log(contents);
    this.renderContents(contents);
  }

  renderContents(contents) {
    this.contentList.innerHTML = ``;
    contents.forEach((content) =>
      this.contentList.appendChild(new Content(content))
    );
  }
}

class Content extends HTMLDivElement {
  constructor({ id, post_content, name, post_top_img }) {
    super();
    this.classList.add('content-item');

    this.innerHTML = `
      <span class="content">${post_content}</span>
      <span class="username">${name}</span>
      <img src="${post_top_img}" alt="">
    `;

    this.addEventListener('click', () => {
      console.log(id);
    });
  }
}

window.customElements.define('content-item', Content, { extends: 'div' });
window.customElements.define('search-modal', SearchModal, { extends: 'div' });

export default SearchModal;
