class SignUp extends HTMLDivElement {
constructor() {
  super();

  document.title = 'SignUp';

  this.render()
}

  render() {
    this.innerHTML =  
    `
    <div class="signup-container">
      <div id="signUpPage">
        <main class="container">
          <h1>2951</h1>
          <h2>현지 학기제의 사진과 동영상을 보려면 가입하세요.</h2>
          <!--SignUp FORM-->
          <form id="signUpForm" class="signUp_wrap" onsubmit="saveUserData(event)">
            <input id="inputId" type="text" placeholder="아이디"/>
            <input id="inputName" type="text" placeholder="성명"/>
            <input id="inputUsername" type="text" placeholder="사용자 이름"/>
            <input id="inputPw" type="password" placeholder="비밀번호"/>
            <button id="signUpBtn" type="submit" disabled="true">가입</button>
          </form>
        </main>
        <main class="container_login">
          <!--//LOGIN FORM-->
          <p>계정이 있으신가요?</p>
          <a href="../login_page/test.html" class="moveToLogin">로그인</a>
        </main>
      </div>
    </div>
    `;

  }
}

window.customElements.define('signup-page', SignUp, { extends: 'div' });

export default SignUp;