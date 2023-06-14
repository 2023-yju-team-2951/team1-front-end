export function generateToken() {
  const GENERATE_TOKEN_LENGTH = 20;

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let token = '';

  for (let i = 0; i < GENERATE_TOKEN_LENGTH; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
}
