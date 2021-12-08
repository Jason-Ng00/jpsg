import * as React from "react"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineGraph(props) { 

  const [activeIndex, setActiveIndex] = React.useState(null);
  
  const handleClick = (data, event) => {
    const index = event.index
    const payload = event.payload
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
          <Tooltip content = {<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey={props.yaxis} stroke="#8884d8" activeDot={{ onClick:handleClick }} />
          </LineChart>
        </ResponsiveContainer>

        {/* {activeIndex && <p className="content">{`Uv of "${activeItem.value}": ${activeItem.year}`}</p>} */}
      </div>
    );
}


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:"#fff", outline:"2px solid #ADD8E6", padding:"10px"}}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="label">{JSON.stringify(payload)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};
