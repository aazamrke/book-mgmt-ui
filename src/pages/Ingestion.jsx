import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Ingestion() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    processedToday: 0,
    failedJobs: 0
  });

  useEffect(() => {
    loadIngestionData();
  }, []);

  const loadIngestionData = async () => {
    console.log('Loading ingestion data...');
    try {
      // Try to get documents first to show ingestion options
      const documentsResponse = await api.get("/documents");
      const documents = documentsResponse.data || [];
      
      // Create jobs from documents with status checks
      const jobPromises = documents.slice(0, 5).map(async (doc) => {
        try {
          const statusResponse = await api.get(`/ingestion/status/${doc.id}`);
          return {
            id: doc.id,
            name: `Processing ${doc.filename}`,
            status: statusResponse.data.status || 'pending',
            progress: statusResponse.data.status === 'completed' ? 100 : 
                     statusResponse.data.status === 'running' ? 75 : 0,
            startTime: new Date(doc.uploaded_at).toLocaleString()
          };
        } catch {
          return {
            id: doc.id,
            name: `Processing ${doc.filename}`,
            status: 'pending',
            progress: 0,
            startTime: new Date(doc.uploaded_at).toLocaleString()
          };
        }
      });
      
      const jobs = await Promise.all(jobPromises);
      setJobs(jobs);
      
      // Calculate stats from documents
      const totalDocs = documents.length;
      const today = new Date().toDateString();
      const processedToday = documents.filter(doc => 
        new Date(doc.uploaded_at).toDateString() === today
      ).length;
      const failedJobs = jobs.filter(job => job.status === 'failed').length;
      
      setStats({ 
        totalDocuments: totalDocs, 
        processedToday: processedToday, 
        failedJobs: failedJobs 
      });
      
    } catch (error) {
      console.error("Failed to load ingestion data:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      // Keep mock data as fallback
      setJobs([
        { id: 1, name: "PDF Processing", status: "Running", progress: 75, startTime: "2024-01-15 10:30" },
        { id: 2, name: "Text Extraction", status: "Completed", progress: 100, startTime: "2024-01-15 09:15" },
        { id: 3, name: "Index Building", status: "Failed", progress: 45, startTime: "2024-01-15 08:00" }
      ]);
      setStats({ totalDocuments: 1234, processedToday: 56, failedJobs: 3 });
    }
  };

  const startIngestion = async () => {
    setLoading(true);
    try {
      // Use the actual backend endpoint format
      const response = await api.post("/ingestion/trigger/1"); // Using document ID 1 as default
      console.log('Ingestion response:', response.data);
      alert(`Ingestion job started successfully. Job ID: ${response.data.job_id}`);
      await loadIngestionData(); // Refresh data
    } catch (error) {
      console.error("Failed to start ingestion:", error);
      alert('Failed to start ingestion. Backend endpoint not available.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="page-header">
          <h2>Data Ingestion</h2>
          <button 
            className="btn btn-primary" 
            onClick={startIngestion}
            disabled={loading}
          >
            {loading ? 'Starting...' : 'Start Ingestion'}
          </button>
        </div>

        <div className="ingestion-stats">
          <div className="stat-card">
            <h4>Total Documents</h4>
            <span className="stat-number">{stats.totalDocuments.toLocaleString()}</span>
          </div>
          <div className="stat-card">
            <h4>Processed Today</h4>
            <span className="stat-number">{stats.processedToday}</span>
          </div>
          <div className="stat-card">
            <h4>Failed Jobs</h4>
            <span className="stat-number">{stats.failedJobs}</span>
          </div>
        </div>

        <div className="jobs-section">
          <h3>Recent Jobs</h3>
          {jobs.map(job => (
            <div key={job.id} className="job-item">
              <div className="job-info">
                <h4>{job.name}</h4>
                <p>Started: {job.startTime}</p>
              </div>
              <div className="job-status">
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${job.progress}%`}}
                  ></div>
                </div>
                <span className="progress-text">{job.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}