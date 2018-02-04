import React from 'react';
import ReactDOM from 'react-dom';
import 'w3-css/w3.css'
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept()
}
