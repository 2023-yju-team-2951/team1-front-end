export async function getShoes() {
  const res = await fetch('http://localhost:7000/shoes');
  const data = await res.json();
  return data;
}

export async function getShoesById(id) {
  const res = await fetch(`http://localhost:7000/shoes/${id}`);
  const data = await res.json();
  return data;
}
