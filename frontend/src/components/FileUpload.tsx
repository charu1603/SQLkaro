import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  onUpload: (tableName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      onUpload(res.data.table);
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload CSV</button>
    </form>
  );
};

export default FileUpload;
