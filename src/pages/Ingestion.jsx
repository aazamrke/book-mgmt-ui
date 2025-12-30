import { useEffect, useState } from "react";
import {
  runIngestion,
  getIngestionStatus
} from "../api/ingestion";

export default function Ingestion() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    getIngestionStatus().then(res =>
      setStatus(res.data.status)
    );
  }, []);

  const start = async () => {
    await runIngestion();
    setStatus("running");
  };

  return (
    <>
      <h2>Ingestion</h2>
      <p>Status: {status}</p>
      <button onClick={start}>Run Ingestion</button>
    </>
  );
}
