import { useState } from "react";

export default function RAGSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    // Simulate search - replace with actual API call
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: "Introduction to Machine Learning",
          content: "Machine learning is a subset of artificial intelligence that focuses on algorithms...",
          source: "ml_textbook.pdf",
          score: 0.95
        },
        {
          id: 2,
          title: "Deep Learning Fundamentals",
          content: "Deep learning uses neural networks with multiple layers to model and understand...",
          source: "deep_learning_guide.pdf",
          score: 0.87
        },
        {
          id: 3,
          title: "Natural Language Processing",
          content: "NLP combines computational linguistics with machine learning to help computers...",
          source: "nlp_handbook.pdf",
          score: 0.82
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="page-header">
          <h2>RAG Search</h2>
          <p>Search through your document knowledge base</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Enter your question or search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn btn-primary search-btn"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="search-results">
            <h3>Search Results ({results.length})</h3>
            {results.map(result => (
              <div key={result.id} className="result-item">
                <div className="result-header">
                  <h4>{result.title}</h4>
                  <span className="confidence-score">
                    Confidence: {(result.score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="result-content">{result.content}</p>
                <div className="result-footer">
                  <span className="source">Source: {result.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Searching through documents...</p>
          </div>
        )}
      </div>
    </div>
  );
}