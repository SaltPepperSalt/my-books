import React from 'react';

export default function BookList({ books, loading, error, getBooks }) {
  React.useEffect(() => {
    getBooks();
  }, [getBooks]);
  return (
    <div>
      BookList
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {error === null && books.map((book) =>
        <p>{book.title}</p>
      )}
    </div>
  )
}