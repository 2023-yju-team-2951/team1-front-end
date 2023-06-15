/**
 * 서버로부터 계정 목록을 가져옵니다.
 * @returns {Promise<[]>} 계정 목록
 */
export async function getAccounts() {
  const res = await fetch('http://localhost:7000/accounts');

  if (!res.ok) {
    throw new Error(`Failed to fetch accounts, ${res.status}`);
  }

  const data = await res.json();
  return data;
}

/**
 * 서버로부터 id를 통해 계정을 가져옵니다.
 * @param {*} id
 * @returns {Promise<{}>} 계정
 */
export async function getAccountById(id) {
  const res = await fetch(`http://localhost:7000/accounts/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch account, ${res.status}`);
  }

  const data = await res.json();
  return data;
}

/**
 * 서버로부터 id를 통해 계정을 업데이트합니다.
 * @param {*} id
 * @param {string} userToken
 */
export async function updateUserToken(id, userToken) {
  const res = await fetch(`http://localhost:7000/accounts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userToken }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update user token, ${res.status}`);
  }
}

/**
 * 서버에 로그인을 요청합니다.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} account id
 */
export async function login(email, password) {
  const accounts = await getAccounts();

  const account = accounts.find(
    (account) => account.email === email && account.password === password
  );

  if (!account) {
    throw new Error('Invalid email or password');
  }

  return account.id;
}

/**
 * 서버에 로그온 요청을 합니다.
 * @param {string} userToken
 * @returns {Promise<string>} account id
 */
export async function logon(userToken) {
  const accounts = await getAccounts();

  const account = accounts.find((account) => account.userToken === userToken);

  if (!account) {
    throw new Error('Invalid user token');
  }

  return account.id;
}
