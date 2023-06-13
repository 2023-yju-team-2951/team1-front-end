export async function getAccount(id) {
  const res = await fetch(`http://localhost:7000/accounts/${id}`);
  const data = await res.json();
  return data;
}