import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/books";
import DataTable from 'react-data-table-component';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      console.error('Failed to load books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
        alert(`Failed to delete book: ${error.response?.status || error.message}`);
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
        <button 
          className="btn btn-danger"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
      width: '120px',
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>Books</h2>
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
