import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select video");

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    setProgress(0);
    setDownloadLink("");

    // 🔥 FAKE PROGRESS
    let fakeProgress = 0;

    const interval = setInterval(() => {
      fakeProgress += Math.random() * 5;

      if (fakeProgress >= 95) {
        fakeProgress = 95;
        clearInterval(interval);
      }

      setProgress(Math.floor(fakeProgress));
    }, 300);

    try {
      const res = await axios.post(
        "https://bairan-reel-backend.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      // ✅ COMPLETE
      setProgress(100);
      setDownloadLink(res.data.url);
      setLoading(false);

    } catch (err) {
      console.error(err);
      alert("Error processing video");
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>🔥 Bairan Reel Generator</h1>

      {/* Steps */}
      <div className="steps">
        <h2>  How It Works  </h2>
        <p>1️⃣ Upload 6 sec video</p>
        <p>2️⃣ Click Generate</p>
        <p>3️⃣ Download Reel 🚀</p>
      </div>

      {/* Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Button */}
      <button className="btn-primary" onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Generate Reel"}
      </button>

      {/* Progress */}
      {loading && (
        <>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Dynamic Text */}
          <p className="loading-text">
            {progress < 30 && "Uploading video..."}
            {progress >= 30 && progress < 70 && "Applying effects..."}
            {progress >= 70 && progress < 95 && "Rendering reel..."}
            {progress >= 95 && "Finalizing..."}
          </p>
        </>
      )}

      {/* Download */}
      {downloadLink && (
        <div className="download-box">
          <h3>✅ Reel Ready</h3>
          <a href={downloadLink} target="_blank" rel="noreferrer">
            ⬇ Download Reel
          </a>
        </div>
      )}

    </div>
  );
}

export default Upload;