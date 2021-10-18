import { prop } from "cheerio/lib/api/attributes";
import * as React from "react"
import { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer} from 'recharts';

export default function BarGraph(props) { 

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

    return (
      <div style={{ width: '100%' }}>
        <div>{props.title}</div>

        <ResponsiveContainer width="100%" height={props.containerHeight ? props.containerHeight : 600}>
        <PieChart width={730} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={props.radius ? props.radius : 200} fill= {props.color?props.color:'#8884d8'} label={(entry) => entry.name} />
        </PieChart>
        </ResponsiveContainer>
      </div>
    );
}
