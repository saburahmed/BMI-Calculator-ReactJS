import '../styles/App.scss';
import React from 'react';

// App Components
import Calculator from './Calculator';

/*
 * Main Component
 */
export default class App extends React.Component {

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='large-6 large-offset-3 columns'>
            <Calculator />
          </div>
        </div>
      </div>
    );
  }
}