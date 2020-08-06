import React from 'react';

export default function BookList({ books, loading, err, getBooks }) {
  React.useEffect(() => {
    getBooks();
  }, [getBooks]);
  return (
    <div>
      BookList
      {loading && <p>Loading</p>}
      {err && <p>Error</p>}
      {err === null && books.map((book) =>
        <p>{book.title}</p>
      )}
    </div>
  )
}