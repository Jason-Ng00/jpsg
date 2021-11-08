import * as React from "react"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


export default function LineGraph(props) { 

  const [activeIndex, setActiveIndex] = React.useState(null);
  
  const handleClick = (data, index) => {
    if(props.click && index != activeIndex) {
      setActiveIndex(index);
      props.click(props.data[index].year)
    } else if (props.click) {
      setActiveIndex(null);
      props.click(null)
    }

  };
  const data = props.data

  const activeItem = data[activeIndex];
    return (
      <div style={{ width: '100%' }}>
        <div>{props.title}</div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={150} height={80} data={data} onMouseMove={props => {
          // We get the values passed into the onMouseMove event 
          if(props.isTooltipActive) {
            // If the tooltip is active then we display the Y value 
            // under the mouse using our custom mapping
          }
        }}    >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props.xaxis} label={{ value: props.xaxis, position: 'insideBottomRight', offset: 0 }}/>
          <YAxis label={{ value: props.yaxisName ? props.yaxisName : props.yaxis, angle: -90}} />
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey={props.yaxis} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

        {/* {activeIndex && <p className="content">{`Uv of "${activeItem.value}": ${activeItem.year}`}</p>} */}
      </div>
    );
}


const CustomTooltip = ({ active, payload, label }) => {
  alert(payload)
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].event}`}</p>
        <p className="intro">${payload}</p>
      </div>
    );
  }
  return null;
};
