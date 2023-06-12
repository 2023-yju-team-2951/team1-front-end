import './SearchModal.css';
class SearchModal extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('search-modal', 'modal-dialog');
    this.setAttribute('role', 'document');

    // TODO: 미완성
    this.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">검색</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('search-modal', SearchModal, { extends: 'div' });

export default SearchModal;
