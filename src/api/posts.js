import { method } from 'lodash';

export async function getPost() {
  const res = await fetch('http://localhost:7000/posts');
  const data = await res.json();
  return data;
}

export function createPost(post) {
  const res = fetch('http://localhost:7000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
}


