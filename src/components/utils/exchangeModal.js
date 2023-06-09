export function exchangeModal(newModal) {
  const old = document.querySelector('.modal');
  old.parentNode.replaceChild(newModal, old);
}
