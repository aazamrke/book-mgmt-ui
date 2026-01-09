import { useState } from "react";
import { addBook } from "../api/books";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year_published: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authors = [
    'J.K. Rowling',
    'Stephen King',
    'Agatha Christie',
    'George Orwell',
    'Jane Austen',
    'Mark Twain',
    'Ernest Hemingway',
    'Charles Dickens',
    'William Shakespeare',
    'Harper Lee'
  ];

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Horror',
    'Thriller',
    'Comedy',
    'Drama'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'year_published' ? parseInt(value) || '' : value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      alert('Title and Author are required');
      return;
    }
    
    setLoading(true);
    try {
      await addBook(book);
      navigate("/books");
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2>Add Book</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Title *</label>
            <input 
              className="form-control"
              name="title"
              value={book.title}
              placeholder="Enter book title" 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <select 
              className="form-control"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            >
              <option value="">Select an author...</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select 
              className="form-control"
              name="genre"
              value={book.genre}
              onChange={handleChange}
            >
              <option value="">Select a genre...</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Year Published</label>
            <input 
              className="form-control"
              name="year_published"
              value={book.year_published}
              placeholder="Enter publication year" 
              type="number"
              min="1000"
              max="2024"
              onChange={handleChange}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Book'}
          </button>
        </form>
      </div>
    </div>
  );
}
