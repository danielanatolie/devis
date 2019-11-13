import * as d3 from 'd3';

const data = [
  { name: 'file 1', debt: 25 },
  { name: 'file 2', debt: 15 },
  { name: 'file 3', debt: 30 },
  { name: 'file 4', debt: 20 }
];
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
export default class D3Chart {
  constructor(element) {
    const max = d3.max(data, d => {
      return d.debt;
    });

    const min = d3.min(data, d => {
      return d.debt;
    });

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.2);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .attr('stroke', 'white')
      .call(xAxis);
    svg
      .append('g')
      .attr('stroke', 'white')
      .call(yAxis);

    svg.selectAll('path').style('stroke', 'white');
    svg.selectAll('line').style('stroke', 'white');
    svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 40)
      .attr('text-anchor', 'middle')
      .attr('stroke', 'white')
      .text('File Name');

    svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('stroke', 'white')
      .text('Debt')
      .attr('transform', 'rotate(-90)');

    const rects = svg.selectAll('rect').data(data);

    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.debt))
      .attr('width', 50)
      .attr('height', d => HEIGHT - y(d.debt))
      .attr('fill', d => {
        if (d.debt > 20) {
          return 'red';
        }
        return 'grey';
      });
  }
}
