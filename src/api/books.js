import api from "./axios";

export const getBooks = () => api.get("/books");

export const getBookById = (id) =>
  api.get(`/books/${id}`);

export const addBook = (data) =>
  api.post("/books", data);

export const updateBook = (id, data) =>
  api.put(`/books/${id}`, data);

export const deleteBook = (id) =>
  api.delete(`/books/${id}`);

export const generateSummary = (id) =>
  api.post(`/books/${id}/generate-summary`);

export const getBookSummary = (id) =>
  api.get(`/books/${id}/summary`);

