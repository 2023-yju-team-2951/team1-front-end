/**
 * 서버에서 포스트 목록을 받아옵니다.
 * @returns {Promise<[]>} 포스트 목록
 */
export async function getPost() {
  const res = await fetch('http://localhost:7000/posts');
  const data = await res.json();
  return data;
}

/**
 * 서버에서 id를 통해 포스트를 받아옵니다.
 * @param {*} post
 * @returns {Promise<{}>} 포스트
 */
export async function createPost(post) {
  const res = await fetch('http://localhost:7000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
}
