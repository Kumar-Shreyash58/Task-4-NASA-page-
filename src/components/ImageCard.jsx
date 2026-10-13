import { Link } from "react-router-dom";
export default function ImageCard({ item }) {
  const info = item.data?.[0];
  const url = item.links?.find(l => l.render === "image")?.href;
  if (!info?.nasa_id || !url) return null;
  const date = info.date_created
    ? new Date(info.date_created).toLocaleDateString()
    : "Date unavailable";
  return (
    <Link to={`/image/${encodeURIComponent(info.nasa_id)}`} className="image-card">
      <div className="image-wrap flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={url}
              alt={info.title || "NASA image"}
              loading="lazy"
              onError={e => { e.currentTarget.style.visibility = "hidden"; }}
            />
            <div className="image-overlay"><span>VIEW DETAILS ↗</span></div>
          </div>
          <div className="flip-card-back">
            <span className="flip-label">NASA COLLECTION</span>
            <h3>{info.title || "Untitled image"}</h3>
            <p>{date}</p>
            <span className="flip-view">VIEW DETAILS ↗</span>
          </div>
        </div>
      </div>
      <div className="card-info">
        <h3>{info.title || "Untitled image"}</h3>
        <p>{date}</p>
      </div>
    </Link>
  );
}
