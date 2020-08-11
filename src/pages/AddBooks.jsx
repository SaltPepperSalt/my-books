import React from 'react';
import { Link } from 'react-router-dom';

export default function AddBooks(props) {
  const titleRef = React.createRef(null);
  const authorRef = React.createRef(null);
  const messageRef = React.createRef(null);
  const urlRef = React.createRef(null);
  return (
    <>
      <form>
        <input type="text" ref={titleRef} />
        <input type="text" ref={authorRef} />
        <input type="text" ref={messageRef} />
        <input type="text" ref={urlRef} />
        <button type="button" onClick={click}>전송</button>
      </form>
      <Link to="/">To Home</Link>
    </>
  )

  async function click() {


    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const message = messageRef.current.value;
    const url = urlRef.current.value;


    props.addBook({ title, author, message, url });

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}