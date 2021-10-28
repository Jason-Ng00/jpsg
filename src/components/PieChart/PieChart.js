import { prop } from "cheerio/lib/api/attributes";
import * as React from "react"
import { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Legend,  ResponsiveContainer, Cell} from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, name, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}: ${value} performances`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}% of total`}
      </text>
    </g>
  );
};

export default function PieGraph(props) { 

  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  };

  const data = props.data
  data.sort(function(a, b) {
    var keyA = Number(a.value),
      keyB = Number(b.value);
    // Compare the 2 years
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });


  var newData = []  
  for (var i = 0; i < data.length; i++) {
    if (i < 6) {
      newData.push(data[i])
    } else {
      if (newData.length == 6) {
        var n = data.length - 6
        newData.push(
          {
            name: n + " Other Genres",
            value: data[i].value
          }
        ) 
      } else {
        newData[6].value += data[i].value
      }
    }
  }
  const COLORS =  ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    return (
      <div style={{ width: '100%' }}>
        <div>{props.title}</div>

        <ResponsiveContainer width="100%" height={props.containerHeight ? props.containerHeight : 600}>
        <PieChart width={730} height={250}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
            <Pie 
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={newData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={props.radius ? props.radius : 200} innerRadius={props.innerRadius ? props.innerRadius : 0} 
            fill= {props.color?props.color:'#8884d8'} 
            onMouseEnter={onPieEnter} >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
        </PieChart>
        </ResponsiveContainer>
      </div>
    );
}
            // label={props.label ? (entry) => entry.name: null}