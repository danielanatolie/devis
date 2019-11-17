import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import "./App.css";
import { ButtonToolbar, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      showBarGraph: false,
      barGraphData: []
    };
  }

  handleClick = async () => {
    const response = await fetch("/api/test");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("server response = ", body);
    this.setState({
      barGraphData: [
        { name: "file 1", debt: 25 },
        { name: "file 2", debt: 15 },
        { name: "file 3", debt: 30 },
        { name: "file 4", debt: 20 }
      ]
    });
    this.setState({ showBarGraph: true });
  };

  render() {
    const showBarGraph = this.state.showBarGraph;

    return (
      <div className="App">
        <header>
          <p className="title">Tech Debt Estimator</p>
        </header>
        <body>
          <div className="container">
            <ButtonToolbar>
              <Button onClick={this.handleClick} variant="primary">
                Analyze Complexity
              </Button>
            </ButtonToolbar>
          </div>

          <Container>
            {showBarGraph ? (
              <ChartWrapper data={this.state.barGraphData} />
            ) : null}
          </Container>
        </body>
      </div>
    );
  }
}

export default App;
