class LoginPage extends HTMLDivElement {
  constructor() {
    super();

    this.innerHTML = ` 
      <div>adasd</div>
    `;
  }
}

window.customElements.define('login-page', LoginPage, { extends: 'div' });

export default LoginPage;
