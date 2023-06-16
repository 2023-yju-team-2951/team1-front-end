export async function getCategories() {
  const response = await fetch('http://localhost:7000/categories');
  const data = await response.json();
  return data;
}