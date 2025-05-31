import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DownloadZip = () => {
  // Bestanden die je wilt toevoegen aan de ZIP (pad relatief aan /public)
  const files = [
    { path: "programma/bestand1.txt", name: "bestand1.txt" },
    { path: "programma/bestand2.txt", name: "bestand2.txt" },
    { path: "programma/subfolder/bestand3.txt", name: "subfolder/bestand3.txt" }
  ];

  const downloadZip = async () => {
    const zip = new JSZip();

    for (const file of files) {
      try {
        const response = await fetch(file.path);
        const blob = await response.blob();
        zip.file(file.name, blob);
      } catch (err) {
        console.error("Fout bij ophalen:", file.path, err);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "programma.zip");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Download de Programma-folder</h2>
      <p>Klik op de knop hieronder om een ZIP-bestand van alle bestanden te downloaden.</p>
      <button
        onClick={downloadZip}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Download ZIP
      </button>
    </div>
  );
};

export default DownloadZip;