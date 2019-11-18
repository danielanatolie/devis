import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import VisNetwork from "./VisNetwork";
import "./App.css";
import { ButtonToolbar, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      showBarGraph: false,
      barGraphData: [],
      couplingData: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch("/api/test");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("server response = ", body);
    this.setState({
      barGraphData: this.filterData(body.fileToDebtMap)
    });
    this.setState({
      couplingData: this.createEdgeWeights(body.couplingData[0])
    });
  };

  handleClick = () => {
    this.setState({ showBarGraph: true });
  };

  filterData = data => {
    const fileToDebt = [];

    Object.keys(data).forEach(key => {
      fileToDebt.push({ name: key, debt: data[key] });
    });
    fileToDebt.sort((a, b) => (a.debt < b.debt ? 1 : -1));
    return fileToDebt.slice(0, 10);
  };

  createEdgeWeights = data => {
    var edges = [];
    Object.keys(data).forEach(key => {
      var filenames = key.split("&&");
      edges.push({from: filenames[0], to: filenames[1]})
    })
    console.log(edges)
    }
  

  displayCouplingGraph = () => {
    console.log("coupling data is: ");
    console.log(this.state.couplingData)
  }

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
          <div className="container">
          <ButtonToolbar>
              <Button onClick={this.displayCouplingGraph} variant="primary">
                Analyze Coupling
              </Button>
            </ButtonToolbar>
          </div>
          <div class = "vis-container">
          <Container>
              <VisNetwork />
          </Container>
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
