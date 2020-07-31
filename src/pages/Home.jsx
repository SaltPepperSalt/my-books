import React from 'react';
import withAuth from '../hocs/withAuth'
import axios from 'axios';
import Counter from '../components/Counter'
import PersonContext from '../contexts/PersonContext';


class Home extends React.Component {
  static contextType = PersonContext;
  state = {
    books: [{ title: 'hello' }],
    loading: false,
    err: null,
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        {this.state.loading && 'Loading'};
        {this.state.err && 'Error'}
        {this.state.err === null && this.state.books.map(book => book.title)};
        <Counter />
        <p>{JSON.stringify(this.context)}</p>
      </div >
    );
  }
  async componentDidMount() {
    await sleep(2000);
    try {
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        }
      })
      console.log(response);
      const books = response.data;
      this.setState({ books });
    } catch (err) {

      console.log(err);
    }
  }
}


export default withAuth(Home);
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, ms)
  })
}
