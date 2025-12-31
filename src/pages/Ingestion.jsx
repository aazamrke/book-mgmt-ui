import { useEffect, useState } from "react";

export default function Ingestion() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    setJobs([
      { id: 1, name: "PDF Processing", status: "Running", progress: 75, startTime: "2024-01-15 10:30" },
      { id: 2, name: "Text Extraction", status: "Completed", progress: 100, startTime: "2024-01-15 09:15" },
      { id: 3, name: "Index Building", status: "Failed", progress: 45, startTime: "2024-01-15 08:00" }
    ]);
  }, []);

  const startIngestion = () => {
    setLoading(true);
    // Simulate ingestion process
    setTimeout(() => {
      setLoading(false);
      alert('Ingestion job started successfully');
    }, 2000);
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
            <span className="stat-number">1,234</span>
          </div>
          <div className="stat-card">
            <h4>Processed Today</h4>
            <span className="stat-number">56</span>
          </div>
          <div className="stat-card">
            <h4>Failed Jobs</h4>
            <span className="stat-number">3</span>
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