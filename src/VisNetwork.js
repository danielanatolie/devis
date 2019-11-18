import React, { Component, Fragment } from "react";
var vis = require('vis');


export default class ChartWrapper extends Component {
    
    componentDidMount(){
        var nodes = new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ]);
        
        // create an array with edges
        var edges = new vis.DataSet([
            {from: 1, to: 3, value: 3},
            {from: 1, to: 2, value: 20},
            {from: 2, to: 4, value: 1},
            {from: 2, to: 5, value: 7}
        ]);
        
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

