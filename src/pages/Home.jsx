import React, { useEffect, useState, useContext } from 'react';
import withAuth from '../hocs/withAuth'
import axios from 'axios';
import Counter from '../components/Counter'
import PersonContext from '../contexts/PersonContext';
import { Row, Col, Button } from 'antd'
import "antd/dist/antd.css"
import { LinkOutlined } from '@ant-design/icons'
import styles from './Home.module.css'
import { Link } from 'react-router-dom';

function Home(props) {
  const context = useContext(PersonContext);
  const [state, setState] = useState({
    books: [{ title: 'hello' }],
    loading: false,
    err: null,
  })

  useEffect(() => {
    fetchData(props, state, setState);
  }, []);

  console.log(state);
  return (
    <div>
      <Row justify="center">
        <Col span={20} className="home">
          <h1>Home</h1>
          <Row>
            <Col span={24}>
              <img src="/books.jpg" alt="books" className={styles.books_img} />
            </Col>
          </Row>
          <Link to="/signin">
            <Button
              type="default"
              className={styles.logout_button}
              onClick={logout}
            >
              Logout
          </Button>
          </Link>
          {state.loading && 'Loading'}
          {state.err && 'Error'}
          {state.err === null && state.loading === false && state.books.map(book => {
            return (
              <Row className={styles.books}>
                <Col span={12}>{book.title}</Col>
                <Col className={styles.book_author} span={10}>{book.author}</Col>
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
              </Row>
            )
          })
          }
        </Col>
      </Row>
    </div >
  );
}

export default withAuth(Home);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, ms)
  })
}

async function fetchData(props, state, setState) {
  setState({ ...state, loading: true })
  await sleep(2000);
  try {
    const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    })

    const books = response.data;
    setState({ ...state, books: books, loading: false });
  } catch (err) {
    console.log(err);
  }
}
const logout = () => {
  sessionStorage.removeItem('token');
}
