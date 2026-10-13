import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ImageDetails from "./pages/ImageDetails";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/image/:nasaId" element={<ImageDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
