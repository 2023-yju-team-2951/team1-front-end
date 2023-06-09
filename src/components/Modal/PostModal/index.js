import './PostModal.css';
import Modal from '..';

class PostModal extends Modal {
  constructor() {
    super();
    this.classList.add('post-modal');

    this.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title">새 게시물 만들기</h5>
            <button type="button" class="btn btn-share">공유하기</button>
          </div>
          <div class="modal-body d-flex">
            <div class="post-upload-img"></div>
            <div class="post-write">
              <textarea class="form-control" placeholder="문구 입력..."></textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('post-modal', PostModal, { extends: 'div' });

export default PostModal;
