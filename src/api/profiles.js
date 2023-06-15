/**
 * 서버에서 프로필 목록을 가져옵니다.
 * @returns {Promise<Profile[]>} 프로필 목록
 */
export async function getProfiles() {
  const res = await fetch('http://localhost:7000/profiles');

  if (!res.ok) {
    throw new Error(`Failed to fetch profiles, ${res.status}`);
  }

  const data = await res.json();
  return data;
}

/**
 * 서버에서 id를 통해 프로필을 가져옵니다.
 * @param {*} id
 * @returns {Promise<{}>} 프로필
 */
export async function getProfileById(id) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch profile, ${res.status}`);
  }

  const data = await res.json();
  return data;
}

/**
 * 서버에서 id를 통해 프로필을 업데이트합니다.
 * @param {*} id
 * @param {*} storyImg
 * @param {*} storyText
 * @returns {Promise<{}>} 업데이트된 프로필
 */
export async function updateProfile(id, storyImg, storyText) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ storyImg, storyText }),
  });
  const data = await res.json();
  return data;
}

/**
 * 서버에서 id를 통해 프로필을 삭제합니다.
 * @param {*} id
 * @returns {Promise<{}>} 삭제된 프로필
 */
export async function deleteProfile(id) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
}

/**
 * 서버에 프로필을 추가합니다.
 * @param {*} data
 * @returns
 */
export async function postProfile(data) {
  const res = await fetch(`http://localhost:7000/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to post profile, ${res.status}`);
  }
  return res.json();
}
