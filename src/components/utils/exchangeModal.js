export function exchangeModal(newModal) {
  const old = document.querySelector('.modal');
  old.innerHTML = ``;
  old.appendChild(newModal);
}
