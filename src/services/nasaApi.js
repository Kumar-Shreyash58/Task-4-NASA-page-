const API = "https://images-api.nasa.gov";
export async function searchNASAImages(query = "space", page = 1) {
  const url = new URL(`${API}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("media_type", "image");
  url.searchParams.set("page", page);
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to fetch NASA images.");
  const data = await response.json();
  return {
    items: data.collection?.items || [],
    total: data.collection?.metadata?.total_hits || 0
  };
}
