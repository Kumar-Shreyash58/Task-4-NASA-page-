import { useEffect, useState } from "react";
import { useImages } from "../context/ImageContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Pagination from "../components/Pagination";
export default function Home() {
  const { images, query, page, total, loading, error, fetchImages } = useImages();
  const [searchText, setSearchText] = useState("space");
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchImages(searchText.trim() || "space", 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, fetchImages]);
  const totalPages = Math.ceil(total / 100);
  return (
    <main className="app">
      <Navbar />
      <section className="hero">
        <p className="eyebrow">EXPLORE THE MIGHTY UNIVERSE</p>
        <h1>Discover the <span>infinity.</span></h1>
        <p className="subtitle">
          Find out the images of planets, galaxies, nebulae,
          and the wonders of our universe.
        </p>

        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={term => {
            setSearchText(term);
          }}
        />
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>{query === "space" ? "Explore space" : `Results for "${query}"`}</h2>
          </div>
          <span className="result-count">{total.toLocaleString()} results</span>
        </div>

        {loading && (
          <div className="status-message" role="status">
            <div className="spinner" /> Exploring the universe...
          </div>
        )}

        {!loading && error && (
          <div className="status-message error-message" role="alert">
            {error}
            <button onClick={() => fetchImages(query, page)}>Try again</button>
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div className="status-message">No images found. Try another search.</div>
        )}

        {!loading && !error && images.length > 0 && (
          <div className="image-grid">
            {images.map((item, i) => (
              <ImageCard key={`${item.data?.[0]?.nasa_id}-${i}`} item={item} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={p => fetchImages(query, p)}
          />
        )}
      </section>
      <footer className="footer">
        Space imagery and videography.
      </footer>
    </main>
  );
}