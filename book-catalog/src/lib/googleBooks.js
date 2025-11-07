
export async function searchBooks(query, maxResults = 12) {
  if (!query || !query.trim()) return { items: [] };

  const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const params = new URLSearchParams({
    q: query,
    maxResults: String(maxResults),
  });
  if (key) params.set("key", key);

  const url = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Books API error: ${res.status} ${text}`);
  }
  return res.json();
}
