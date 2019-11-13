import * as d3 from 'd3';

const data = [
  { name: 'file 1', debt: 25 },
  { name: 'file 2', debt: 15 },
  { name: 'file 3', debt: 30 },
  { name: 'file 4', debt: 20 }
];

const WIDTH = 500;
const HEIGHT = 500;
export default class D3Chart {
  constructor(element) {
    const max = d3.max(data, d => {
      return d.debt;
    });

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, HEIGHT]);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.2);

    const rects = svg.selectAll('rect').data(data);

    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => HEIGHT - y(d.debt))
      .attr('width', 50)
      .attr('height', d => y(d.debt))
      .attr('fill', d => {
        if (d.debt > 20) {
          return 'red';
        }
        return 'grey';
      });
  }
}
