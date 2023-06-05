class PostModal extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('modal');
    this.classList.add('fade');
    this.classList.add('d-block', 'show');
    this.setAttribute('tabindex', '-1');
    this.setAttribute('role', 'dialog');

    this.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">새 게시물 만들기</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {}
}

window.customElements.define('post-modal', PostModal, { extends: 'div' });

export default PostModal;
