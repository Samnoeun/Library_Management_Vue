import apiService from '@/plugins/axios'

export const getBooks = () => apiService.get('/books');
export const getBook = (id) => apiService.get(`/books/${id}`);
export const createBook = (book) => apiService.post('/books', book);
export const updateBook = (id, book) => apiService.put(`/books/${id}`, book);
export const deleteBook = (id) => apiService.delete(`/books/${id}`);
export const searchBooks = (query) => apiService.get(`/books/search`, { params: { q: query } });
export const getBooksByCategory = (categoryId) => apiService.get(`/books/category/${categoryId}`);