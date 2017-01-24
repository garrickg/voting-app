import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import PollPage from './components/PollPage'
import './index.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={App} />
        <Match exactly pattern="/polls/:pollId" component={PollPage} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#root'))
