class Modal extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('modal');
    this.classList.add('fade');
    this.classList.add('d-block', 'show');
    this.setAttribute('tabindex', '-1');
    this.setAttribute('role', 'dialog');
  }
}

window.customElements.define('custom-modal', Modal, { extends: 'div' });

export default Modal;
