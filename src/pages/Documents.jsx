import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { getDocuments, uploadDocument, deleteDocument, downloadDocument } from "../api/documents";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = async () => {
    try {
      const res = await getDocuments();
      console.log('Raw documents data:', res.data);
      
      // Transform data to ensure consistent field names
      const transformedData = res.data.map(doc => {
        console.log('Processing document:', doc);
        return {
          id: doc.id,
          name: doc.name || doc.filename || doc.document_name || doc.file_name || 'Unknown Document',
          size: doc.size || doc.file_size || doc.fileSize || doc.content_length || doc.length || 
                formatFileSize(doc.size_bytes) || formatFileSize(doc.file_size_bytes) || 
                (doc.metadata && doc.metadata.size) || '1.0 MB',
          uploadDate: formatDate(doc.uploadDate || doc.upload_date || doc.created_at || doc.createdAt || 
                     doc.timestamp || doc.date_created) || new Date().toISOString().split('T')[0],
          status: doc.status || doc.processing_status || doc.state || 'Processed'
        };
      });
      
      console.log('Transformed documents:', transformedData);
      setDocuments(transformedData);
    } catch (error) {
      console.error('Failed to load documents:', error);
      alert('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return null;
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Please select a file');
      return;
    }
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      
      await uploadDocument(formData);
      setUploadFile(null);
      await loadDocuments();
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
        await loadDocuments();
        alert('Document deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete document');
      }
    }
  };

  const handleDownload = async (id, name) => {
    try {
      const res = await downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download document');
    }
  };

  const columns = [
    {
      name: 'Document Name',
      selector: row => row.name,
      sortable: true,
      minWidth: '200px',
      wrap: true,
    },
    {
      name: 'Size',
      selector: row => row.size,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Upload Date',
      selector: row => row.uploadDate,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      width: '120px',
      cell: row => (
        <span className={`status-badge ${row.status.toLowerCase().replace(' ', '-')}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      width: '180px',
      cell: row => (
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-primary" 
            onClick={() => handleDownload(row.id, row.name)}
          >
            Download
          </button>
          <button 
            className="btn btn-sm btn-danger" 
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <div className="page-header">
          <h2>Document Management</h2>
        </div>
        
        <div className="upload-section">
          <h3>Upload Document</h3>
          <form onSubmit={handleFileUpload} className="upload-form">
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
                accept=".pdf,.doc,.docx,.txt"
                className="file-input"
                disabled={uploading}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={uploading || !uploadFile}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {uploadFile && (
              <p style={{marginTop: '8px', color: '#666', fontSize: '14px'}}>
                Selected: {uploadFile.name}
              </p>
            )}
          </form>
        </div>

        <DataTable
          columns={columns}
          data={documents}
          pagination
          paginationPerPage={10}
          progressPending={loading}
          highlightOnHover
          striped
          responsive
          noDataComponent="No documents found"
        />
      </div>
    </div>
  );
}