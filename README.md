# Book Management UI

A React-based web application for managing books, documents, and RAG (Retrieval-Augmented Generation) search functionality.

## Features

- **Authentication**: Login/logout with token-based authentication
- **Role-Based Access Control**: Edit/delete buttons disabled for users without admin or write permissions
- **Books Management**: View, add, edit, and delete books with DataTable interface
- **Authors & Genres Management**: Full CRUD operations for authors and genres with permission controls
- **Document Management**: Upload, list, download, and delete documents
- **RAG Search**: Search through documents using AI-powered retrieval
- **Admin Users**: Manage users and roles with tabbed interface
- **Ingestion**: Process and ingest documents for search
- **Document Summary**: Generate AI-powered summaries of uploaded documents

## Pages

- `/login` - User authentication
- `/books` - Books listing and management
- `/add-book` - Add new books with dropdown selection or create new authors/genres
- `/author-genre` - Authors and genres CRUD management
- `/documents` - Document upload and management
- `/rag` - RAG search interface
- `/admin/users` - User and role management
- `/summary` - Document summary generation
- `/ingestion` - Document processing

## Backend API Requirements

The application expects a backend server running on `http://127.0.0.1:8000` with these endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Books
- `GET /books` - List books
- `POST /books` - Add book (requires author_id and genre_id)
- `PUT /books/{id}` - Update book (requires author_id and genre_id)
- `DELETE /books/{id}` - Delete book
- `GET /books/dropdown/authors` - Get authors for dropdown (returns AuthorResponse[])
- `GET /books/dropdown/genres` - Get genres for dropdown (returns GenreResponse[])

### Authors
- `GET /authors` - List all authors
- `POST /authors` - Create author
- `PUT /authors/{id}` - Update author
- `DELETE /authors/{id}` - Delete author

### Genres
- `GET /genres` - List all genres
- `POST /genres` - Create genre
- `PUT /genres/{id}` - Update genre
- `DELETE /genres/{id}` - Delete genre

### Documents
- `GET /documents` - List documents
- `POST /documents/upload` - Upload document
- `POST /documents/{id}/summary` - Generate document summary
- `DELETE /documents/{id}` - Delete document
- `GET /documents/{id}/download` - Download document

### RAG Search
- `POST /search?query={query}&limit=5` - Search documents

### Users
- `GET /users` - List users
- `POST /users` - Create user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /roles` - List roles

### Ingestion
- `GET /ingestion/status/{id}` - Get ingestion status for document
- `GET /ingestion/today-count` - Get today's processed document count
- `POST /ingestion/trigger/{id}` - Start ingestion process for document

## Docker Deployment

### Build Docker Image
```bash
docker build -t book-mgmt-ui .
```

### Run Docker Container
```bash
docker run -p 3000:80 book-mgmt-ui
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dependencies

- React 18
- React Router DOM
- Axios for API calls
- React Data Table Component
- Modern CSS with responsive design

## Mock Data Fallback

The application includes mock data fallbacks for all API endpoints, allowing it to function even when the backend is unavailable. This enables development and testing without requiring a fully implemented backend.

## Project Structure

```
src/
├── auth/           # Authentication components
├── pages/          # Main application pages
├── components/     # Reusable components
├── api/            # API configuration and calls
└── index.css       # Global styles and responsive design
```