import * as React from "react"
import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function LineGraph(props) {
  const [activeIndex, setActiveIndex] = React.useState(null)

  const handleClick = (data, event) => {
    const index = event.index
    if (props.click && index !== activeIndex) {
      setActiveIndex(index)
      props.click(props.data[index].year)
    } else if (props.click) {
      setActiveIndex(null)
      props.click(null)
    }
  }
  const data = props.data

  const [perc, setPerc] = useState(0)
  const onMouseMove = hoveredData => {
    if (hoveredData && hoveredData.activePayload) {
      const hoveredX = hoveredData.activePayload[0].payload.year
      const index = data.findIndex(d => d.year === hoveredX)
      const percentage = ((data.length - index - 1) * 100) / (data.length - 1)

      setPerc(100 - percentage)
    }
  }

  const onMouseOut = () => {
    setPerc(0)
  }

  return (
    <div style={{ width: "100%" }}>
      <div>{props.title}</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={150}
          height={80}
          data={data}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={props.xaxis}
            label={{
              value: props.xaxis,
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{
              value: props.yaxisName ? props.yaxisName : props.yaxis,
              angle: -90,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="blue" />
              <stop offset={`${perc}%`} stopColor="blue" />
              <stop offset={`${perc}%`} stopColor="red" />
              <stop offset={`${100}%`} stopColor="red" />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey={props.yaxis}
            stroke="url(#colorUv)"
            dot={false}
            activeDot={{ onClick: handleClick }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* {activeIndex && <p className="content">{`Uv of "${activeItem.value}": ${activeItem.year}`}</p>} */}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          outline: "2px solid #ADD8E6",
          padding: "10px",
        }}
      >
        <p className="label">{`${label} : ${payload[0].value}`} performances</p>
        {payload[0].payload.Event && (
          <p className="label">{payload[0].payload.Event}</p>
        )}
      </div>
    )
  }

  return null
}
