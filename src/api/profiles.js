export async function getProfiles() {
  const res = await fetch('http://localhost:7000/profiles');
  const data = await res.json();
  return data;
}

export async function getProfile(id) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`);
  const data = await res.json();
  return data;
}

export async function updateProfile(id, storyImg, storyText) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ storyImg, storyText }),
  });
  const data = await res.json();
  return data;
}

export async function putProfile(id, data) {
  const res = await fetch(`http://localhost:7000/profiles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res;
  }
  return res.json();
}

export async function postProfile(data) {
  const res = await fetch(`http://localhost:7000/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw res;
  }
  return res.json();
}