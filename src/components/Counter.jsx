import React, { useState, useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import PersonContext from '../contexts/PersonContext';

export default function Counter() {
  const [count, setCount] = useState(0);

  const width = useWindowWidth();
  const context = useContext(PersonContext);
  React.useEffect(() => {
    console.log('counter componentdidmount')
    return () => {
      console.log('counter componentwillunmount')
    };
  }, []);

  React.useEffect(() => {
    console.log('state가 변경후 실행')
    return () => {
      //clean up
      console.log('state가 변경전 실행')
    };
  }, [count]);



  return (
    <>
      <h1>{count} {width}</h1>
      <button onClick={click}>+</button>
      <p>{JSON.stringify(context)}</p>
    </>
  )
  function click() {
    setCount(count + 1);
  }
}