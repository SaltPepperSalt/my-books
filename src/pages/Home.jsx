import React, { useEffect, useState, useContext } from 'react';
import withAuth from '../hocs/withAuth'
import axios from 'axios';
import Counter from '../components/Counter'
import PersonContext from '../contexts/PersonContext';
import { Row, Col } from 'antd'
import "antd/dist/antd.css"
import './Home.module.css'

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
          {state.loading && 'Loading'}
          {state.err && 'Error'}
          {state.err === null && state.loading === false && state.books.map(book => {
            return (
              <Row>
                <span>{book.title}</span>
                <span>{book.author}</span>
                <LinkOutlined />
              </Row>
            )
          })
          }
          < Counter />
          <p>{JSON.stringify(context)}</p>
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
