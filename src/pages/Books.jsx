import { useEffect, useState } from "react";
import { getBooks, deleteBook, updateBook } from "../api/books";
import DataTable from 'react-data-table-component';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      console.error('Failed to load books:', error);
      alert('Failed to load books. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook({...book});
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBook(editingBook.id, editingBook);
      setEditingBook(null);
      setShowEditForm(false);
      await loadBooks();
      alert('Book updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update book');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        console.log('Deleting book with ID:', id);
        await deleteBook(id);
        console.log('Delete successful, reloading books');
        await loadBooks();
        alert('Book deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        if (error.response?.status === 401) {
          alert('Authentication failed. Please login again.');
        } else if (error.response?.status === 404) {
          alert('Book not found.');
        } else {
          alert(`Failed to delete book: ${error.response?.data?.message || error.message}`);
        }
      }
    }
  };

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Author',
      selector: row => row.author,
      sortable: true,
    },
    {
      name: 'Genre',
      selector: row => row.genre,
      sortable: true,
    },
    {
      name: 'Year',
      selector: row => row.year_published,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      width: '180px',
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>Books</h2>
        
        {showEditForm && (
          <div className="upload-section">
            <h3>Edit Book</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Title"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Author"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Genre"
                  value={editingBook.genre}
                  onChange={(e) => setEditingBook({...editingBook, genre: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Year Published"
                  type="number"
                  value={editingBook.year_published}
                  onChange={(e) => setEditingBook({...editingBook, year_published: parseInt(e.target.value) || ''})}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Summary (optional)"
                  value={editingBook.summary || ''}
                  onChange={(e) => setEditingBook({...editingBook, summary: e.target.value})}
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-primary">Update Book</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowEditForm(false)}
                style={{marginLeft: '10px'}}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
        
        <DataTable
          columns={columns}
          data={books}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          progressPending={loading}
          highlightOnHover
          striped
          responsive
          noDataComponent="No books found"
        />
      </div>
    </div>
  );
}
