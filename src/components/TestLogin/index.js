import { login, updateUserToken } from '../../api/accounts';
import { generateToken } from '../../utils/generateToken';

class TestLogin extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('container');
    this.innerHTML = `
      <form>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <input type="email" id="form2Example1" class="form-control" name="email" />
          <label class="form-label" for="form2Example1">Email address</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <input type="password" id="form2Example2" class="form-control" name="password" />
          <label class="form-label" for="form2Example2">Password</label>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div class="col">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <!-- Submit button -->
        <button type="button" class="send-btn btn btn-primary btn-block mb-4">Sign in</button>

        <!-- Register buttons -->
        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    `;

    this.form = this.querySelector('form');
    this.sendBtn = this.querySelector('.send-btn');
    this.sendBtn.addEventListener('click', async () => await this.tryLogin());
  }

  async tryLogin() {
    const email = this.form['email'].value;
    const password = this.form['password'].value;

    try {
      const id = await login(email, password);
      const userToken = generateToken();
      await updateUserToken(id, userToken);

      sessionStorage.setItem('userToken', userToken);
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

window.customElements.define('test-login', TestLogin, { extends: 'div' });

export default TestLogin;
