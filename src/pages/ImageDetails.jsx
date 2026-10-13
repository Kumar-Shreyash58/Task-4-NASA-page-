import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
const API = "https://images-api.nasa.gov";
export default function ImageDetails() {
  const { nasaId } = useParams();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      setImage(null);
      setUrl("");
      try {
        const search = new URL(`${API}/search`);
        search.searchParams.set("nasa_id", nasaId);
        search.searchParams.set("media_type", "image");
        const response = await fetch(search);
        if (!response.ok) throw new Error("Could not load image details.");
        const data = await response.json();
        const item = data.collection?.items?.find(
          x => x.data?.[0]?.nasa_id === nasaId
        );
        if (!item) throw new Error("Image not found.");
        const assetResponse = await fetch(
          `${API}/asset/${encodeURIComponent(nasaId)}`
        );
        if (!assetResponse.ok) throw new Error("Could not load image asset.");
        const assetData = await assetResponse.json();
        const assets = assetData.collection?.items || [];
        const imageUrl = assets.find(
          x => /\.(jpg|jpeg|png|webp)$/i.test(x.href)
        )?.href || item.links?.find(x => x.render === "image")?.href;

        if (!imageUrl) throw new Error("No image file available.");

        if (!cancelled) {
          setImage(item.data[0]);
          setUrl(imageUrl);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [nasaId]);

  async function downloadImage() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error();

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${nasaId}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="details-page">
      <Navbar />
      <Link to="/" className="back-link">← Back to gallery</Link>

      {loading && <p className="details-status">Loading image...</p>}
      {error && <p className="details-status error-message">{error}</p>}

      {!loading && !error && image && (
        <article className="details-content">
          <div className="details-image">
            <img src={url} alt={image.title || "NASA image"} />
          </div>

          <div className="details-info">
            <p className="eyebrow">NASA IMAGE ARCHIVE</p>
            <h1>{image.title || "Untitled image"}</h1>
            <p className="details-date">
              {image.date_created
                ? new Date(image.date_created).toLocaleDateString()
                : "Date unavailable"}
            </p>
            <p className="details-description">
              {image.description || "No description available."}
            </p>
            <p className="nasa-id">NASA ID: {image.nasa_id}</p>
            <button className="download-button" onClick={downloadImage}>
              ↓ Download Image
            </button>
          </div>
        </article>
      )}

      <footer className="footer">
        Space imagery provided by the NASA Image and Video Library.
      </footer>
    </main>
  );
}
