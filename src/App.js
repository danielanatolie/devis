import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper';
import './App.css';
import { ButtonToolbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const response = await fetch('/api/test');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('server response = ', body);
  };

  render() {
    return (
      <div className="App">
        <ChartWrapper />
        <header>
          <p className="title">Devis</p>
        </header>
        <body>
          <div className="container">
            <ButtonToolbar>
              <Button onClick={this.handleClick} variant="primary">
                Analyze Complexity
              </Button>
            </ButtonToolbar>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
