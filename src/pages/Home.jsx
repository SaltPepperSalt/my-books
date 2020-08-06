import React, { useEffect, useState, useContext } from 'react';
import withAuth from '../hocs/withAuth'
import axios from 'axios';
import Counter from '../components/Counter'
import DarkContext from '../contexts/DarkContext';
import { Row, Col, Button } from 'antd'
import "antd/dist/antd.css"
import { LinkOutlined, UpCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import classNames from 'classnames'
import BookListContainer from '../containers/BookListContainer';

function Home(props) {
  const context = useContext(DarkContext).mode;
  const [state, setState] = useState({
    books: [],
    loading: false,
    err: null,
    mode: context,
  })
  useEffect(() => {
    fetchData(props, state, setState);
  }, []);

  return (
    <BookListContainer token={props.token} />
    // <div className={context && styles.body_dark}>
    //   <Row justify="center">
    //     <Col span={20} className="home">
    //       <h1 className={context && styles.h1_dark}>Home</h1>
    //       <Row>
    //         <Col span={24}>
    //           <img src="/books.jpg" alt="books" className={styles.books_img} />
    //         </Col>
    //       </Row>
    //       <Link to="/signin">
    //         <Button
    //           type="default"
    //           className={classNames(styles.logout_button, context && styles.btn_dark)}
    //           onClick={logout}
    //         >
    //           Logout
    //       </Button>
    //         <Button
    //           type="default"
    //           className={classNames(styles.mode_btn, context && styles.btn_dark)}
    //           onClick={() => {
    //             props.change({ mode: !context });
    //           }}
    //         >
    //           Dark Mode
    //   </Button>
    //       </Link>
    //       {state.err && 'Error'}
    //       <Row className={styles.books}>
    //         <Col span={12}>Title</Col>
    //         <Col className={styles.book_author} span={10}>Author</Col>
    //         <Col span={2} className={styles.link}>
    //           Link
    //         </Col>
    //       </Row>
    //       <div className={styles.loading}>
    //         {state.loading && <LoadingOutlined />}
    //       </div>
    //       {state.err === null && state.loading === false && state.books.map(book => {
    //         return (
    //           <Row className={styles.books}>
    //             <Col span={12}>{book.title}</Col>
    //             <Col className={styles.book_author} span={10}>{book.author}</Col>
    //             <Col span={2}>
    //               <a
    //                 href={book.url}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 title="교보문고 사이트로 이동"
    //                 className={styles.link}
    //               >
    //                 <LinkOutlined />
    //               </a>
    //             </Col>
    //           </Row>
    //         )
    //       })
    //       }
    //     </Col>
    //   </Row>
    //   <UpCircleOutlined className={styles.top_btn} onClick={toTop}></UpCircleOutlined>
    //   <Footer />
    // </div >
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

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

