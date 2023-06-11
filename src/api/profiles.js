export async function getProfiles() {
  const res = await fetch('http://localhost:7000/profiles');
  const data = await res.json();
  return data;
}

export async function getPost() {
  const res = await fetch('http://localhost:7000/posts');
  const data = await res.json();
  return data;
}