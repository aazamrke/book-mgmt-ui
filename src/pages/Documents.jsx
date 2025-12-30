import { useEffect, useState } from "react";
import {
  uploadDocument,
  getDocuments
} from "../api/documents";

export default function Documents() {
  const [file, setFile] = useState(null);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDocuments().then(res => setDocs(res.data));
  }, []);

  const upload = async () => {
    await uploadDocument(file);
    const res = await getDocuments();
    setDocs(res.data);
  };

  return (
    <>
      <h2>Documents</h2>

      <input type="file"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>

      <ul>
        {docs.map(d => (
          <li key={d.id}>{d.filename}</li>
        ))}
      </ul>
    </>
  );
}
