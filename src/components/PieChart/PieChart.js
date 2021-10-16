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

  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];

    return (
      <div style={{ width: '100%' }}>
        <div>{props.title}</div>

        <ResponsiveContainer width="100%" height={400}>
        <PieChart width={730} height={250}>
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
        </ResponsiveContainer>
      </div>
    );
}
