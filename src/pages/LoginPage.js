class LoginPage extends HTMLDivElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML =
    `
      <div id="login-page">
        <div class="login-container">

          <div class="login-left-container">
            <div class="left-image">
              <img src="https://cdn.pixabay.com/photo/2016/11/18/11/16/instagram-1834010_1280.png" alt="login-img">
            </div>
          </div>

          <div class="login-right-container">
            <div class="right-form">
              <h1 class="login-logo">2951</h1>
              <form id="login-form">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button class="btn-login" type="submit">로그인</button>
              </form>
            </div>
            <div class="right-footer">
              <p>계정이 없으신가요? <a data-link href="/signup">회원가입</a></p>
            </div>
          </div>

        </div>
      </div>
    `
  }
}

window.customElements.define('login-page', LoginPage, { extends: 'div' });

export default LoginPage;
