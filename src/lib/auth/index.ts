export async function isAuth() {
  const response = await fetch("/api/me");
  const data = await response.json();

  return Boolean(data.address);
}
