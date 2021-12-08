import * as React from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarGraph(props) { 

  const [activeIndex, setActiveIndex] = React.useState(null);
  
  const handleClick = (data, index) => {
    if(props.click && index !== activeIndex) {
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
          <BarChart width={150} height={80} data={data}>
          <YAxis label={{ value: props.yaxisName ? props.yaxisName : props.yaxis, angle: -90}} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={props.xaxis} label={{ value: props.xaxis, position: 'insideBottomRight', offset: 0 }}/>
            <Bar dataKey={props.yaxis} onClick={handleClick}>
            {data.map((entry, index) => (
                <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : (props.color?props.color:'#8884d8')} key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* {activeIndex && <p className="content">{`Uv of "${activeItem.value}": ${activeItem.year}`}</p>} */}
      </div>
    );
}
