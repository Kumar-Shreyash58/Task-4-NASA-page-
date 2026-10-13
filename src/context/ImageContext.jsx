import { createContext, useContext, useState, useCallback } from "react";
import { searchNASAImages } from "../services/nasaApi";
const ImageContext = createContext(null);
export function ImageProvider({ children }) {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("space");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchImages = useCallback(async (term = "space", p = 1) => {
    setLoading(true);
    setError("");
    try {
      const result = await searchNASAImages(term, p);
      setImages(result.items);
      setTotal(result.total);
      setQuery(term);
      setPage(p);
    } catch (err) {
      setImages([]);
      setTotal(0);
      setError(err.message || "Unable to load images.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ImageContext.Provider value={{
      images, query, page, total, loading, error, fetchImages
    }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImages must be inside ImageProvider");
  return context;
}
