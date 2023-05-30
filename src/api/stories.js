export async function getStories() {
  const res = await fetch('http://localhost:7000/stories');
  const data = await res.json();
  return data;
}
