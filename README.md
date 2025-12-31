# Book Management UI

A React-based web application for managing books, documents, and RAG (Retrieval-Augmented Generation) search functionality.

## Features

- **Authentication**: Login/logout with token-based authentication
- **Books Management**: View, add, and delete books with DataTable interface
- **Document Management**: Upload, list, download, and delete documents
- **RAG Search**: Search through documents using AI-powered retrieval
- **Admin Users**: Manage users and roles with tabbed interface
- **Ingestion**: Process and ingest documents for search
- **Document Summary**: Generate AI-powered summaries of uploaded documents

## Pages

- `/login` - User authentication
- `/books` - Books listing and management
- `/add-book` - Add new books
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
- `POST /books` - Add book
- `PUT /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book

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