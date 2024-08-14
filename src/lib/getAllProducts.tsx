export default async function getAllProducts() {
  const res = await fetch("http://localhost:8000/api/v1/products/list", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return data;
}
