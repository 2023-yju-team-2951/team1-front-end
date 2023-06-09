import './SearchModal.css';
import Modal from '../../Modal';
class SearchModal extends Modal {
  constructor() {
    super();
    this.classList.add('search-modal');

    this.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">검색</h5>
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
}

window.customElements.define('search-modal', SearchModal, { extends: 'div' });

export default SearchModal;
