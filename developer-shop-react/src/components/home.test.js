import React from 'react';
import ReactDOM from 'react-dom';
import App from './home';

it('renders without crashing', () => {

  const div = document.createElement('div');
  var obj = ReactDOM.render(<App />, div);
  console.log(obj);
});
