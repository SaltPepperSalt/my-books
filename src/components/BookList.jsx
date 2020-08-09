import React from 'react';
import { LinkOutlined, UpCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from '../pages/Home.module.css'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import classNames from 'classnames'
import "antd/dist/antd.css"
import { Row, Col, Button } from 'antd'

import BookDelete from './BookDelete';


export default function BookList({ books, loading, error, getBooks }) {
  const mode = true;
  React.useEffect(() => {
    getBooks();
  }, [getBooks]);
  return (
    <div className={mode && styles.body_dark}>
      <Row justify="center">
        <Col span={20} className="home">
          <h1 className={mode && styles.h1_dark}>Home</h1>
          <Row>
            <Col span={24}>
              <img src="/books.jpg" alt="books" className={styles.books_img} />
            </Col>
          </Row>
          <Link to="/signin" onClick={logout}>
            Logout </Link>
          <Link to='/addbook'> ADDBOOK
          </Link>
          {error && 'Error'}
          <Row className={styles.books}>
            <Col span={12}>Title</Col>
            <Col className={styles.book_author} span={8}>Author</Col>
            <Col span={2} className={styles.link}>
              Link
            </Col>
          </Row>
          <div className={styles.loading}>
            {loading && <LoadingOutlined />}
          </div>
          {error === null && loading === false && books.map(book => {
            return (
              <Row className={styles.books}>
                <Col span={12}>{book.title}</Col>
                <Col className={styles.book_author} span={8}>{book.author}</Col>
                <Col span={2}>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="교보문고 사이트로 이동"
                    className={styles.link}
                  >
                    <LinkOutlined />
                  </a>
                </Col>
                <Col span={2}>
                  <BookDelete bookId={book.bookId} />
                </Col>
              </Row>
            )
          })
          }
        </Col>
      </Row>
      <UpCircleOutlined className={styles.top_btn} onClick={toTop}></UpCircleOutlined>
      <Footer />
    </div >
  )
  function logout() {
    sessionStorage.removeItem('token');
  }

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}