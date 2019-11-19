import React, { Component } from "react";
var vis = require('vis');

export default class VisNetwork extends Component {

    componentDidMount(){
        var filenames = this.props.data[0]
        var couplingEdges = this.props.data[1]
        var nodes = new vis.DataSet(filenames);
        var edges = new vis.DataSet(couplingEdges);
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};
        var network = new vis.Network(this.refs.myRef, data, options);
    }

    render()  {
        return <div ref="myRef"></div>;
    }
};

