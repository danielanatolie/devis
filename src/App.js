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
      showCouplingGraph: false,
      barGraphData: [],
      couplingData: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch("/api/test");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("server response = ", body);
    this.setState({
      barGraphData: this.filterData(body.fileToDebtMap)
    });
    this.setState({
      couplingData: this.createVisData(body.couplingData)
    });
    console.log("im normal")
    console.log(this.state.couplingData)
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

  createVisData = data => {
    var result = []
    var edges = [];
    var nodes = []
  
    for (var i = 0; i < data[1].length; i ++) {
      nodes.push({id: i, label: data[1][i]})
    }
    Object.entries(data[0]).forEach(element => {
      var filenames = element[0].split("&&");
      var fromFileIndex;
      var toFileIndex;
      for (var i = 0; i < nodes.length; i++){
        if (filenames[0] == nodes[i]['label']){
          fromFileIndex = nodes[i]['id']
        }
        if (filenames[1] == nodes[i]['label']){
          toFileIndex = nodes[i]['id']
        }
      }
      edges.push({from: fromFileIndex, to: toFileIndex, value:element[1]})
    })
    result.push(nodes)
    result.push(edges)
    return result
    }

  displayCouplingGraph = () => {
    this.setState({ showCouplingGraph: true });
  }

  render() {
    const showBarGraph = this.state.showBarGraph;
    const showCouplingGraph = this.state.showCouplingGraph;

    return (
      <div className="App">
        <header>
          <p className="title">Tech Debt Estimator</p>
        </header>
        <body>
          <div className="container">

            <div className="bar-graph-container">
              <ButtonToolbar>
                <Button onClick={this.handleClick} variant="primary">
                  Analyze Complexity
                </Button>
              </ButtonToolbar>
              <p className="caption">Complexity measures whether a function is a large function, 
                                    has many IF statements, or has long lines. 
                                    A debt score is then calculated based on these criterias. </p>
              <Container>
                {showBarGraph ? (
                  <ChartWrapper data={this.state.barGraphData} />
                ) : null}
              </Container>
            </div>
            
            <div className="vis-container">
              <ButtonToolbar>
                <Button onClick={this.displayCouplingGraph} variant="primary">
                  Analyze Coupling
                </Button>
              </ButtonToolbar>
              <p className="caption">Coupling is defined as how many times a class refers to other classes. </p>
              <Container>
                {showCouplingGraph ? (
                    <VisNetwork data={this.state.couplingData} />
                  ) : null}
              </Container>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
